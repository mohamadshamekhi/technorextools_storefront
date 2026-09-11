import type { z } from 'zod';

import type { shippingMethodSchema } from '../services/shipping.schemas';

export type ShippingMethod = z.infer<typeof shippingMethodSchema>;

/** Result of `useCoupon` after an apply attempt. */
export type CouponFeedback = { text: string; valid: boolean };

/** Minimal product shape the cart upsell rail needs, mapped from the catalog API. */
export type UpsellProduct = {
  id: string;
  title: string;
  price: number;
  slug: string;
  categorySlug: string;
  imageUrl?: string | null;
};

/** Computed order totals — everything `OrderSummary` needs to render. */
export type CartTotals = {
  subtotal: number;
  discount: number;
  freeShipping: boolean;
  shippingCost: number;
  total: number;
};
