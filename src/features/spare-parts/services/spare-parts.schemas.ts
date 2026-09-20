import { z } from 'zod';

/**
 * Zod mirrors of `abzar/api` `/storefront/spare-parts` views.
 * Source: `../api/src/modules/spare-parts/spare-part.view.ts`.
 */
export const sparePartSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  partNumber: z.string().nullable(),
  shortDesc: z.string().nullable(),
  description: z.string().nullable(),
  price: z.number(),
  stockQty: z.number(),
  weightGrams: z.number().nullable(),
  isActive: z.boolean(),
  mainImageUrl: z.string().nullable(),
  images: z.array(z.object({ url: z.string() }).passthrough()),
  compatibleProducts: z.array(z.object({ id: z.string(), title: z.string(), slug: z.string() })),
});

export const sparePartListSchema = z.object({
  items: z.array(sparePartSchema),
  total: z.number(),
  skip: z.number(),
  take: z.number(),
});

export const sparePartsQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  productSlug: z.string().trim().max(160).optional(),
  inStock: z.enum(['true']).optional(),
});

export type SparePart = z.infer<typeof sparePartSchema>;
export type SparePartList = z.infer<typeof sparePartListSchema>;
export type SparePartsQuery = z.infer<typeof sparePartsQuerySchema>;
