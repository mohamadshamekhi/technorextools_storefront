import { z } from 'zod';

/**
 * Mirrors `abzar/api`'s `/storefront/payment-methods` (`StorefrontPaymentMethodView`) — an
 * admin-managed metadata table (title/description per code), keyed by `code`, not referenced
 * by id anywhere: checkout-start takes the plain `code` directly.
 * Source: `../api/src/modules/storefront/payment-methods/storefront-payment-methods.service.ts`.
 */
export const paymentMethodViewSchema = z.object({
  id: z.string(),
  code: z.enum(['online', 'cash']),
  title: z.string(),
  description: z.string().nullable(),
  sortOrder: z.number(),
});
export const paymentMethodListSchema = z.array(paymentMethodViewSchema);

export type PaymentMethodView = z.infer<typeof paymentMethodViewSchema>;
export type PaymentMethodCode = PaymentMethodView['code'];
