import { z } from 'zod';

/**
 * Zod mirror of `abzar/api`'s `/storefront/shipping/methods` view.
 * Source of truth: `../api/src/modules/storefront/shipping/storefront-shipping.service.ts`.
 */
export const shippingMethodSchema = z.object({
  id: z.string(),
  title: z.string(),
  costType: z.enum(['flat', 'by_weight']),
  cost: z.number(),
  freeOverAmount: z.number().nullable(),
  sortOrder: z.number(),
});

export const shippingMethodListSchema = z.array(shippingMethodSchema);
