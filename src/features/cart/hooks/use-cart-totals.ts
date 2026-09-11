'use client';

import { useMemo } from 'react';

import { useCartStore } from '@/store/cart-store';

import type { CartTotals, ShippingMethod } from '../types';

/** Subtotal → discount → shipping → total, recomputed whenever the cart changes.
 * The discount amount is read from `useCartStore` (the absolute تومان amount `abzar/api`
 * validated it for — never a locally-guessed percentage) so `/cart` and `/checkout` share
 * the exact same applied discount instead of each guessing their own. */
export function useCartTotals(methods: ShippingMethod[], shippingId: string): CartTotals {
  const lines = useCartStore((state) => state.lines);
  const discountAmount = useCartStore((state) => state.discountAmount);

  return useMemo(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const discount = Math.min(Math.max(discountAmount, 0), subtotal);
    const method = methods.find((candidate) => candidate.id === shippingId);
    const freeShipping = method?.freeOverAmount !== null && method?.freeOverAmount !== undefined
      ? subtotal >= method.freeOverAmount
      : false;
    const shippingCost = freeShipping ? 0 : (method?.cost ?? 0);
    const total = subtotal - discount + shippingCost;

    return { subtotal, discount, freeShipping, shippingCost, total };
  }, [lines, methods, shippingId, discountAmount]);
}
