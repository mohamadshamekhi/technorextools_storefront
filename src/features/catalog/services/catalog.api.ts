import 'server-only';

import { apiClient } from '@/lib/api-client';

import {
  brandListSchema,
  categoryTreeSchema,
  productDetailSchema,
  productListSchema,
} from './catalog.schemas';
import { bundleListSchema, bundleSchema } from './bundles.schemas';
import { productCommentsSchema } from './comments.schemas';
import { productQuestionsSchema } from './pdp.schemas';
import { toProductsQuery, type CatalogParams } from './catalog.query';

/**
 * Server-only fetchers for the public catalog. Every call is unauthenticated
 * (`auth: false`) and ISR-cached for 5 min; revalidate by tag on write paths later.
 */

const BASE = '/storefront/catalog';
const revalidate = 300;

export function getCategoryTree() {
  return apiClient.get(`${BASE}/categories`, categoryTreeSchema, {
    auth: false,
    next: { revalidate, tags: ['catalog:categories'] },
  });
}

export function listBrands() {
  return apiClient.get(`${BASE}/brands`, brandListSchema, {
    auth: false,
    next: { revalidate, tags: ['catalog:brands'] },
  });
}

export function listProducts(
  params: CatalogParams,
  overrides?: Partial<{ category: string; take: number }>,
) {
  return apiClient.get(`${BASE}/products${toProductsQuery(params, overrides)}`, productListSchema, {
    auth: false,
    next: { revalidate, tags: ['catalog:products'] },
  });
}

export function getProduct(slug: string) {
  return apiClient.get(`${BASE}/products/${encodeURIComponent(slug)}`, productDetailSchema, {
    auth: false,
    next: { revalidate, tags: [`catalog:product:${slug}`] },
  });
}

/** First `isFeatured` product's full detail, for hero/spotlight placements. `null` if none set. */
export async function getFeaturedProduct() {
  const { items } = await apiClient.get(
    `${BASE}/products?take=1&isFeatured=true`,
    productListSchema,
    { auth: false, next: { revalidate, tags: ['catalog:products', 'catalog:featured'] } },
  );
  const card = items[0];
  return card ? getProduct(card.slug) : null;
}

export function getProductComments(slug: string, opts: { skip?: number; take?: number } = {}) {
  const search = new URLSearchParams({
    skip: String(opts.skip ?? 0),
    take: String(opts.take ?? 10),
  });
  return apiClient.get(
    `${BASE}/products/${encodeURIComponent(slug)}/comments?${search.toString()}`,
    productCommentsSchema,
    { auth: false, next: { revalidate, tags: [`catalog:comments:${slug}`] } },
  );
}

/** Approved Q&A for one product. Also embedded in `getProduct`; fetched alone after a post. */
export function getProductQuestions(slug: string) {
  return apiClient.get(
    `${BASE}/products/${encodeURIComponent(slug)}/questions`,
    productQuestionsSchema,
    { auth: false, next: { revalidate, tags: [`catalog:questions:${slug}`] } },
  );
}

/** Active bundles (fixed baskets of variants sold at one price). */
export function listBundles() {
  return apiClient.get(`${BASE}/bundles`, bundleListSchema, {
    auth: false,
    next: { revalidate, tags: ['catalog:bundles'] },
  });
}

export function getBundle(slug: string) {
  return apiClient.get(`${BASE}/bundles/${encodeURIComponent(slug)}`, bundleSchema, {
    auth: false,
    next: { revalidate, tags: [`catalog:bundle:${slug}`] },
  });
}
