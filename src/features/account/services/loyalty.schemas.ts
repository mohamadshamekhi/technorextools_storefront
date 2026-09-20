import { z } from 'zod';

/**
 * Zod mirror of `abzar/api`'s `/storefront/loyalty` view.
 * Source: `../api/src/modules/storefront/loyalty/storefront-loyalty.service.ts` +
 * `../api/src/modules/loyalty/loyalty.service.ts` (`LOYALTY_TIERS`).
 */
const loyaltyTierSchema = z.object({
  key: z.string(),
  title: z.string(),
  minPoints: z.number(),
});

export const loyaltyTierProgressSchema = z.object({
  lifetimePoints: z.number(),
  tier: loyaltyTierSchema,
  nextTier: loyaltyTierSchema.nullable(),
  pointsToNextTier: z.number().nullable(),
  progressPercent: z.number(),
});
export type LoyaltyTierProgress = z.infer<typeof loyaltyTierProgressSchema>;

export const loyaltyTransactionTypeSchema = z.enum(['earn', 'redeem']);

export const loyaltySummarySchema = z.object({
  balance: z.number(),
  tier: loyaltyTierProgressSchema,
  transactions: z.object({
    items: z.array(
      z.object({
        points: z.number(),
        type: loyaltyTransactionTypeSchema,
        note: z.string().nullable(),
        at: z.string(),
      }),
    ),
    total: z.number(),
    skip: z.number(),
    take: z.number(),
  }),
});
export type LoyaltySummary = z.infer<typeof loyaltySummarySchema>;
