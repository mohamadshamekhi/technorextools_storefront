'use client';

import { useEffect } from 'react';

import { Icon } from '@/components/atoms';
import { useCartStore } from '@/store/cart-store';

import { useCartTotals } from '../hooks/use-cart-totals';
import { useCoupon } from '../hooks/use-coupon';
import type { ShippingMethod } from '../types';
import { CheckoutButton } from './checkout-button';
import { CouponField } from './coupon-field';
import { CouponMessage } from './coupon-message';
import { OrderSummaryLines } from './order-summary-lines';
import { ShippingMethods } from './shipping-methods';

export function OrderSummary({ shippingMethods }: { shippingMethods: ShippingMethod[] }) {
  const shippingMethodId = useCartStore((state) => state.shippingMethodId);
  const setShippingMethod = useCartStore((state) => state.setShippingMethod);
  const coupon = useCoupon();

  // Default to the first method once methods load, if nothing was chosen (or the stored
  // choice no longer exists in the list) — persisted from here on, carried into checkout.
  useEffect(() => {
    if (shippingMethods.length === 0) return;
    if (shippingMethodId && shippingMethods.some((method) => method.id === shippingMethodId)) return;
    const first = shippingMethods[0];
    if (first) setShippingMethod(first.id, first.cost);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when the list itself changes
  }, [shippingMethods]);

  const selectedShippingId = shippingMethodId ?? shippingMethods[0]?.id ?? '';
  const totals = useCartTotals(shippingMethods, selectedShippingId);

  const handleSelectShipping = (id: string) => {
    const method = shippingMethods.find((candidate) => candidate.id === id);
    if (method) setShippingMethod(method.id, method.cost);
  };

  return (
    <div className="border-hairline bg-surface rounded-card border p-6 shadow-(--shadow-lift) lg:sticky lg:top-24">
      <div className="mb-4.5 flex items-center gap-2.5">
        <span className="bg-brand-50 text-brand-600 ring-brand-100 flex size-8 items-center justify-center rounded-lg ring-1">
          <Icon name="cart" className="size-4" />
        </span>
        <p className="text-[15px] font-black">خلاصه سفارش</p>
      </div>

      <CouponField
        value={coupon.input}
        onChange={coupon.setInput}
        onApply={coupon.apply}
        pending={coupon.pending}
      />
      <CouponMessage feedback={coupon.feedback} />

      <ShippingMethods
        methods={shippingMethods}
        selected={selectedShippingId}
        subtotal={totals.subtotal}
        onSelect={handleSelectShipping}
      />

      <OrderSummaryLines totals={totals} couponCode={coupon.applied} />

      <CheckoutButton />
    </div>
  );
}
