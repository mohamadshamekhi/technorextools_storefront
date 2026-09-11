import type { IconName } from '@/components/atoms';

export type ShippingMethodKey = 'standard' | 'express';

export type ShippingMethod = {
  key: ShippingMethodKey;
  label: string;
  eta: string;
  price: number;
  icon: IconName;
};

/** Result of `useCoupon` after an apply attempt. */
export type CouponFeedback = { text: string; valid: boolean };

/** Minimal product shape the cart upsell rail needs, mapped from the catalog API. */
export type UpsellProduct = {
  id: string;
  title: string;
  price: number;
  slug: string;
  categorySlug: string;
};

/** Computed order totals — everything `OrderSummary` needs to render. */
export type CartTotals = {
  subtotal: number;
  discount: number;
  freeShipping: boolean;
  shippingCost: number;
  total: number;
};
