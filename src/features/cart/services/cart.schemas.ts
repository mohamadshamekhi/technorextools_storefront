import { z } from 'zod';

/**
 * Zod mirrors of `abzar/api`'s `/storefront/cart` + `/storefront/discounts` views.
 * Source: `../api/src/modules/storefront/{cart/storefront-cart.service,
 * discounts/storefront-discounts.service}.ts`.
 */
export const cartLineViewSchema = z.object({
  id: z.string(),
  kind: z.enum(['variant', 'bundle', 'spare_part']),
  variantId: z.string().nullable(),
  bundleId: z.string().nullable(),
  sparePartId: z.string().nullable(),
  productId: z.string().nullable(),
  productTitle: z.string(),
  productSlug: z.string().nullable(),
  sku: z.string().nullable(),
  colorName: z.string().nullable(),
  imageUrl: z.string().nullable(),
  qty: z.number(),
  unitPrice: z.number(),
  lineTotal: z.number(),
  stockQty: z.number(),
  available: z.boolean(),
});

/** One line of the client cart pushed to the server cart — a variant, spare part or bundle. */
export const cartSyncLineSchema = z.union([
  z.object({ variantId: z.string().length(24), qty: z.number().int().min(1).max(999) }),
  z.object({ sparePartId: z.string().length(24), qty: z.number().int().min(1).max(999) }),
  z.object({ bundleId: z.string().length(24), qty: z.number().int().min(1).max(999) }),
]);
export const cartSyncLinesSchema = z.array(cartSyncLineSchema).min(1).max(50);
export type CartSyncLine = z.infer<typeof cartSyncLineSchema>;

export const cartViewSchema = z.object({
  token: z.string(),
  items: z.array(cartLineViewSchema),
  itemCount: z.number(),
  subtotal: z.number(),
  fulfillable: z.boolean(),
});

export const discountValidationSchema = z.object({
  valid: z.literal(true),
  code: z.string(),
  discountAmount: z.number(),
  eligibleSubtotal: z.number(),
});

export type CartView = z.infer<typeof cartViewSchema>;
export type DiscountValidation = z.infer<typeof discountValidationSchema>;
