import { z } from 'zod';

/**
 * Zod mirrors of the `abzar/api` `/storefront/catalog/*` response views.
 * Source of truth: `../api/src/modules/storefront/catalog/storefront-catalog.service.ts`.
 * `apiClient` parses every response with these — a drifted API shape becomes a 502.
 */

export const brandSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  logoUrl: z.string().nullable(),
  isExclusiveDistributor: z.boolean(),
});

export type CategoryNode = {
  id: string;
  title: string;
  slug: string;
  sortOrder: number;
  children: CategoryNode[];
};

export const categoryNodeSchema: z.ZodType<CategoryNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    sortOrder: z.number(),
    children: z.array(categoryNodeSchema),
  }),
);

export const categoryTreeSchema = z.array(categoryNodeSchema);
export const brandListSchema = z.array(brandSchema);

export const productCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  basePrice: z.number(),
  isAmazingDeal: z.boolean(),
  brand: z.object({ title: z.string(), slug: z.string() }).nullable(),
  mainImageUrl: z.string().nullable(),
});

export const productListSchema = z.object({
  items: z.array(productCardSchema),
  total: z.number(),
  skip: z.number(),
  take: z.number(),
});

export const productDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  shortDesc: z.string().nullable(),
  description: z.string().nullable(),
  basePrice: z.number(),
  isAmazingDeal: z.boolean(),
  datasheetUrl: z.string().nullable(),
  model3dUrl: z.string().nullable(),
  category: z.object({ id: z.string(), title: z.string(), slug: z.string() }),
  brand: z
    .object({
      id: z.string(),
      title: z.string(),
      slug: z.string(),
      logoUrl: z.string().nullable(),
      isExclusiveDistributor: z.boolean(),
      authenticityNote: z.string().nullable(),
    })
    .nullable(),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      alt: z.string().nullable(),
      variantId: z.string().nullable(),
      isMain: z.boolean(),
      sortOrder: z.number(),
    }),
  ),
  variants: z.array(
    z.object({
      id: z.string(),
      sku: z.string(),
      colorName: z.string().nullable(),
      stockQty: z.number(),
      effectivePrice: z.number(),
    }),
  ),
  attributeValues: z.array(
    z.object({
      attributeTitle: z.string(),
      unit: z.string().nullable(),
      inputType: z.string(),
      value: z.string(),
    }),
  ),
  related: z.array(productCardSchema),
});

export const productCommentsSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      authorName: z.string().nullable(),
      rating: z.number(),
      body: z.string(),
      createdAt: z.string(),
    }),
  ),
  total: z.number(),
  skip: z.number(),
  take: z.number(),
  averageRating: z.number().nullable(),
});
