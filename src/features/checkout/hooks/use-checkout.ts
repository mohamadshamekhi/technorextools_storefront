'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { toSyncLines } from '@/features/cart/utils/sync-lines';
import { UnauthorizedError } from '@/lib/api-error';
import { useCartStore, type CartLine } from '@/store/cart-store';

import { CheckoutConflictError, toCheckoutConflict } from '../services/checkout-errors';
import type { CheckoutConflict } from '../services/checkout.schemas';
import { useCheckoutInFlight } from './use-checkout-in-flight';
import type { CheckoutPaymentMethod, CheckoutStep, PlacedOrder } from '../types';

type ConfirmInput = {
  lines: CartLine[];
  shippingMethodId: string;
  discountCode: string | null;
};

type StartResult = { orderNumber: string; total: number; paymentUrl: string | null; paid: boolean };

/** Owns the address → payment → review → success/cash-pending state machine, and places
 * the real order through `/api/checkout` on confirm. */
export function useCheckout() {
  const [step, setStep] = useState<CheckoutStep>('address');
  const [addressId, setAddressId] = useState('');
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod['code'] | ''>('');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [conflict, setConflict] = useState<CheckoutConflict | null>(null);

  // After a `409`, `abzar/api` is the source of truth for when the cart frees up again.
  const inFlightQuery = useCheckoutInFlight(conflict !== null);
  const locked = conflict !== null && inFlightQuery.data?.locked !== false;

  const mutation = useMutation({
    mutationFn: async ({ lines, shippingMethodId, discountCode }: ConfirmInput) => {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: {
            addressId,
            shippingMethodId: shippingMethodId || undefined,
            discountCode: discountCode || undefined,
            redeemPoints: 0,
            paymentMethod: paymentMethod || undefined,
          },
          lines: toSyncLines(lines),
        }),
      });
      if (res.status === 401) throw new UnauthorizedError();
      const payload: unknown = await res.json().catch(() => null);
      if (res.status === 409) {
        const envelope = payload as { message?: string; details?: unknown } | null;
        throw new CheckoutConflictError(toCheckoutConflict(envelope?.details), envelope?.message);
      }
      if (!res.ok) {
        throw new Error(
          (payload as { message?: string } | null)?.message ?? 'ثبت سفارش ناموفق بود',
        );
      }
      return {
        result: payload as StartResult,
        itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      };
    },
    onError: (error) => {
      if (error instanceof CheckoutConflictError) setConflict(error.conflict);
    },
    onSuccess: ({ result, itemCount }) => {
      // The order is placed either way (stock reserved, row created) — safe to clear now.
      useCartStore.getState().clear();

      // `abzar/api` opened a gateway session — leave the app, no local success screen.
      if (result.paymentUrl) {
        window.location.assign(result.paymentUrl);
        return;
      }
      setPlacedOrder({ orderNumber: result.orderNumber, total: result.total, itemCount });
      setStep(result.paid ? 'success' : 'cash-pending');
    },
  });

  return {
    step,
    addressId,
    showNewAddress,
    paymentMethod,
    placedOrder,
    confirming: mutation.isPending || locked,
    /** Set while `abzar/api` reports another checkout/unpaid order holding this cart. */
    conflict,
    /** The blocking order once `abzar/api` names it — drives the "pay it now" prompt. */
    blockingOrder: inFlightQuery.data?.order ?? null,
    conflictResolved: conflict !== null && inFlightQuery.data?.locked === false,
    confirmError:
      mutation.error instanceof Error && !(mutation.error instanceof CheckoutConflictError)
        ? mutation.error.message
        : '',
    selectAddress: setAddressId,
    toggleNewAddress: () => setShowNewAddress((value) => !value),
    selectPayment: setPaymentMethod,
    goToPayment: () => setStep('payment'),
    backToAddress: () => setStep('address'),
    goToReview: () => setStep('review'),
    backToPayment: () => setStep('payment'),
    confirm: (input: ConfirmInput) => {
      if (locked || mutation.isPending) return;
      setConflict(null);
      mutation.mutate(input);
    },
  };
}

export type CheckoutController = ReturnType<typeof useCheckout>;
