import { z } from 'zod';

/**
 * Zod mirrors of `abzar/api` `/storefront/content/*` views.
 * Source: `../api/src/modules/storefront/content/storefront-content.service.ts`.
 */

export const articleCardSchema = z.object({
  title: z.string(),
  slug: z.string(),
  coverImage: z.string().nullable(),
  excerpt: z.string().nullable(),
  publishedAt: z.string().nullable(),
});

export const articleListSchema = z.object({
  items: z.array(articleCardSchema),
  total: z.number(),
  skip: z.number(),
  take: z.number(),
});

export const articleDetailSchema = articleCardSchema.extend({
  id: z.string(),
  body: z.string(),
});
