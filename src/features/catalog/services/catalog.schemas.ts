import { z } from 'zod';

import {
  highlightSchema,
  hotspotSchema,
  productDocumentSchema,
  productPartSchema,
  questionSchema,
} from './pdp.schemas';

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
  imageUrl: string | null;
  sortOrder: number;
  children: CategoryNode[];
};

export const categoryNodeSchema: z.ZodType<CategoryNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    imageUrl: z.string().nullable(),
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
  firstVariant: z
    .object({ id: z.string(), effectivePrice: z.number(), stockQty: z.number() })
    .nullable(),
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
  explodedViewUrl: z.string().nullable().default(null),
  parts: z.array(productPartSchema).default([]),
  /** PDP content served with the product — empty arrays when the admin uploaded none. */
  documents: z.array(productDocumentSchema).default([]),
  highlights: z.array(highlightSchema).default([]),
  model3dHotspots: z.array(hotspotSchema).default([]),
  questions: z.array(questionSchema).default([]),
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
