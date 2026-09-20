import { z } from 'zod';

/**
 * Zod mirror of `abzar/api`'s `/storefront/wishlist` view.
 * Source: `../api/src/modules/storefront/wishlist/storefront-wishlist.service.ts`.
 */
export const wishlistItemSchema = z.object({
  productId: z.string(),
  title: z.string(),
  slug: z.string(),
  basePrice: z.number(),
  brand: z.object({ title: z.string(), slug: z.string() }).nullable(),
  mainImageUrl: z.string().nullable(),
  addedAt: z.string(),
});
export type WishlistItem = z.infer<typeof wishlistItemSchema>;

export const wishlistListSchema = z.array(wishlistItemSchema);

export const addToWishlistInputSchema = z.object({
  productId: z
    .string()
    .trim()
    .regex(/^[a-f0-9]{24}$/i, 'شناسه محصول نامعتبر است'),
});

export type AddToWishlistInput = z.infer<typeof addToWishlistInputSchema>;

export const addToWishlistResultSchema = z.object({ ok: z.literal(true) });
