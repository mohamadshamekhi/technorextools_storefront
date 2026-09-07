'use client';

import { useMemo } from 'react';

import { useCartStore } from '@/store/cart-store';

import { COUPONS } from '../data/coupons';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_METHODS } from '../data/shipping';
import type { CartTotals, ShippingMethodKey } from '../types';

/** Subtotal → discount → shipping → total, recomputed whenever the cart changes. */
export function useCartTotals(shippingKey: ShippingMethodKey, couponCode: string): CartTotals {
  const lines = useCartStore((state) => state.lines);

  return useMemo(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    const discountRate = couponCode ? (COUPONS[couponCode] ?? 0) : 0;
    const discount = Math.round(subtotal * discountRate);
    const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const method = SHIPPING_METHODS.find((candidate) => candidate.key === shippingKey);
    const shippingCost = shippingKey === 'standard' && freeShipping ? 0 : (method?.price ?? 0);
    const total = subtotal - discount + shippingCost;

    return { subtotal, discount, freeShipping, shippingCost, total };
  }, [lines, shippingKey, couponCode]);
}
