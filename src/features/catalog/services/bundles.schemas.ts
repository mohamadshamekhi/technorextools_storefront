import { z } from 'zod';

/**
 * Zod mirror of `GET /storefront/catalog/bundles` (+ `/:slug`).
 * A bundle is a fixed set of variants sold at one price; `bundlePrice` is the whole basket,
 * not a per-item price, so savings are derived from the members' `effectivePrice`.
 */
export const bundleItemSchema = z.object({
  qty: z.number().int().min(1),
  variant: z.object({
    id: z.string(),
    sku: z.string().nullable().default(null),
    colorName: z.string().nullable().default(null),
    stockQty: z.number().int(),
    /** Sellable flag from `abzar/api`; the product's own flag already folds in soft-delete. */
    isActive: z.boolean().default(true),
    effectivePrice: z.number(),
    imageUrl: z.string().nullable().default(null),
    product: z.object({
      id: z.string(),
      title: z.string(),
      slug: z.string(),
      isActive: z.boolean().default(true),
    }),
  }),
});

export const bundleSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().default(null),
  bundlePrice: z.number(),
  /** Bundle cover: the admin's own artwork, else the first member's image, else `null`. */
  imageUrl: z.string().nullable().default(null),
  /** Sum of the members' normal prices — the struck-through figure. */
  compareAtTotal: z.number().default(0),
  /** `compareAtTotal - bundlePrice`, never negative. `0` = not actually cheaper. */
  savingAmount: z.number().default(0),
  /** Server's final verdict: bundle active, every member active + not soft-deleted, and at
   * least one whole package in stock. This is the add-to-cart gate — never re-derive it. */
  available: z.boolean().default(false),
  /** Whole packages current stock covers — the quantity cap. */
  packagesInStock: z.number().int().default(0),
  items: z.array(bundleItemSchema).default([]),
});

export const bundleListSchema = z.array(bundleSchema);

export type Bundle = z.infer<typeof bundleSchema>;
export type BundleItem = z.infer<typeof bundleItemSchema>;
