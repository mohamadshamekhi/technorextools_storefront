import 'server-only';

import { apiClient } from '@/lib/api-client';

import { sparePartListSchema, sparePartSchema, type SparePartsQuery } from './spare-parts.schemas';

/** Public, unauthenticated, ISR-cached fetchers for `/storefront/spare-parts`. */
const BASE = '/storefront/spare-parts';
const revalidate = 300;

export function listSpareParts(query: SparePartsQuery & { take?: number } = {}) {
  const search = new URLSearchParams();
  if (query.q) search.set('q', query.q);
  if (query.productSlug) search.set('productSlug', query.productSlug);
  if (query.inStock) search.set('inStock', 'true');
  search.set('take', String(query.take ?? 60));
  return apiClient.get(`${BASE}?${search.toString()}`, sparePartListSchema, {
    auth: false,
    next: { revalidate, tags: ['spare-parts'] },
  });
}

export function getSparePart(slug: string) {
  return apiClient.get(`${BASE}/${encodeURIComponent(slug)}`, sparePartSchema, {
    auth: false,
    next: { revalidate, tags: [`spare-parts:${slug}`] },
  });
}
