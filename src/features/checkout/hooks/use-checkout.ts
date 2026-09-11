'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';
import { useCartStore, type CartLine } from '@/store/cart-store';

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
          lines: lines.map((line) => ({ variantId: line.id, qty: line.quantity })),
        }),
      });
      if (res.status === 401) throw new UnauthorizedError();
      const payload: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error((payload as { message?: string } | null)?.message ?? 'ثبت سفارش ناموفق بود');
      }
      return {
        result: payload as StartResult,
        itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      };
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
    confirming: mutation.isPending,
    confirmError: mutation.error instanceof Error ? mutation.error.message : '',
    selectAddress: setAddressId,
    toggleNewAddress: () => setShowNewAddress((value) => !value),
    selectPayment: setPaymentMethod,
    goToPayment: () => setStep('payment'),
    backToAddress: () => setStep('address'),
    goToReview: () => setStep('review'),
    backToPayment: () => setStep('payment'),
    confirm: mutation.mutate,
  };
}

export type CheckoutController = ReturnType<typeof useCheckout>;
