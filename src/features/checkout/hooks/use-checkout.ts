'use client';

import { useState } from 'react';

import type { CartLine } from '@/store/cart-store';

import { ADDRESSES } from '../data/addresses';
import { PAYMENT_METHODS } from '../data/payment-methods';
import type { CheckoutStep, PlacedOrder } from '../types';

function generateOrderCode(): string {
  return `PA-${Math.floor(100000 + Math.random() * 899999)}`;
}

/** Owns the address → payment → review → success state machine. */
export function useCheckout() {
  const [step, setStep] = useState<CheckoutStep>('address');
  const [addressId, setAddressId] = useState(ADDRESSES[0]?.id ?? '');
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [paymentKey, setPaymentKey] = useState(PAYMENT_METHODS[0]?.key ?? '');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const confirm = (lines: CartLine[], total: number) => {
    setPlacedOrder({
      code: generateOrderCode(),
      total,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    });
    setStep('success');
  };

  return {
    step,
    addressId,
    showNewAddress,
    paymentKey,
    placedOrder,
    selectAddress: setAddressId,
    toggleNewAddress: () => setShowNewAddress((value) => !value),
    selectPayment: setPaymentKey,
    goToPayment: () => setStep('payment'),
    backToAddress: () => setStep('address'),
    goToReview: () => setStep('review'),
    backToPayment: () => setStep('payment'),
    confirm,
  };
}

export type CheckoutController = ReturnType<typeof useCheckout>;
