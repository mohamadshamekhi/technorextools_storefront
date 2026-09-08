'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';

import { useCartTotals } from '../hooks/use-cart-totals';
import { useCoupon } from '../hooks/use-coupon';
import type { ShippingMethodKey } from '../types';
import { CheckoutButton } from './checkout-button';
import { CouponField } from './coupon-field';
import { CouponMessage } from './coupon-message';
import { OrderSummaryLines } from './order-summary-lines';
import { ShippingMethods } from './shipping-methods';

export function OrderSummary() {
  const [shipping, setShipping] = useState<ShippingMethodKey>('standard');
  const coupon = useCoupon();
  const totals = useCartTotals(shipping, coupon.applied);

  return (
    <div className="border-hairline bg-surface rounded-card border p-6 shadow-(--shadow-lift) lg:sticky lg:top-24">
      <div className="mb-4.5 flex items-center gap-2.5">
        <span className="bg-brand-50 text-brand-600 ring-brand-100 flex size-8 items-center justify-center rounded-lg ring-1">
          <Icon name="cart" className="size-4" />
        </span>
        <p className="text-[15px] font-black">خلاصه سفارش</p>
      </div>

      <CouponField value={coupon.input} onChange={coupon.setInput} onApply={coupon.apply} />
      <CouponMessage feedback={coupon.feedback} />

      <ShippingMethods selected={shipping} freeShipping={totals.freeShipping} onSelect={setShipping} />

      <OrderSummaryLines totals={totals} couponCode={coupon.applied} />

      <CheckoutButton />
    </div>
  );
}
