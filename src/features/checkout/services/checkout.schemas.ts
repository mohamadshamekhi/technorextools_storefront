import { z } from 'zod';

/**
 * Zod mirrors of `abzar/api`'s `/storefront/checkout` endpoints.
 * Source: `../api/src/modules/storefront/checkout/{storefront-checkout.schemas,
 * storefront-checkout.service}.ts`.
 */
export const startCheckoutInputSchema = z.object({
  addressId: z.string().length(24),
  shippingMethodId: z.string().length(24).optional(),
  discountCode: z.string().trim().min(1).max(60).optional(),
  redeemPoints: z.number().int().min(0).default(0),
  /** `cash` leaves the order `pending_payment` until an admin confirms receipt in the
   * backoffice. `GET /storefront/payment-methods` lists title/description per code. */
  paymentMethod: z.enum(['online', 'cash']).default('online'),
});
export type StartCheckoutInput = z.infer<typeof startCheckoutInputSchema>;

export const checkoutStartResultSchema = z.object({
  orderNumber: z.string(),
  total: z.number(),
  /** Gateway redirect link — present only for `online` with a non-zero total. */
  paymentUrl: z.string().nullable(),
  /** `true` when the order was fully covered by discount/points (nothing left to pay). */
  paid: z.boolean(),
});
export type CheckoutStartResult = z.infer<typeof checkoutStartResultSchema>;

export const payAgainResultSchema = z.object({ paymentUrl: z.string() });
export type PayAgainResult = z.infer<typeof payAgainResultSchema>;
