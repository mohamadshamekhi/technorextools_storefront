import { z } from 'zod';

/**
 * Zod mirror of `abzar/api`'s `/storefront/discounts/active` view.
 * Source: `../api/src/modules/storefront/discounts/storefront-discounts.service.ts`.
 */
export const activeDiscountSchema = z.object({
  code: z.string(),
  amountType: z.enum(['percent', 'fixed']),
  value: z.number(),
  minOrderAmount: z.number().nullable(),
  endsAt: z.string().nullable(),
});
export type ActiveDiscount = z.infer<typeof activeDiscountSchema>;

export const activeDiscountListSchema = z.array(activeDiscountSchema);
