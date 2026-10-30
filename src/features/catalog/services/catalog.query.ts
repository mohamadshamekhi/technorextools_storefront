import { z } from 'zod';

/**
 * URL `searchParams` for the catalog / category / search pages, and the
 * mapping to the `abzar/api` `GET /storefront/catalog/products` query.
 * Only filters the API actually supports are modelled.
 */

export const CATALOG_PAGE_SIZE = 12;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'price-asc', label: 'ارزان‌ترین' },
  { value: 'price-desc', label: 'گران‌ترین' },
] as const;

export type CatalogSort = (typeof SORT_OPTIONS)[number]['value'];

export const catalogParamsSchema = z.object({
  q: z.string().trim().min(1).max(120).optional(),
  category: z.string().trim().min(1).max(120).optional(),
  brand: z.string().trim().min(1).max(120).optional(),
  minPrice: z.coerce.number().int().min(0).optional(),
  maxPrice: z.coerce.number().int().min(0).optional(),
  deal: z.enum(['1']).optional(),
  sort: z.enum(['newest', 'price-asc', 'price-desc']).optional(),
  page: z.coerce.number().int().min(1).max(999).optional(),
});

export type CatalogParams = z.infer<typeof catalogParamsSchema>;

type RawSearchParams = Record<string, string | string[] | undefined>;

/** Parse untrusted `searchParams`, falling back to an empty (all-defaults) filter. */
export function parseCatalogParams(raw: RawSearchParams): CatalogParams {
  const result = catalogParamsSchema.safeParse(raw);
  return result.success ? result.data : {};
}

/** Patch that resets every sidebar facet (search query and sort are kept). */
export const CLEAR_FILTERS_PATCH: Partial<CatalogParams> = {
  category: undefined,
  brand: undefined,
  deal: undefined,
  minPrice: undefined,
  maxPrice: undefined,
};

/** Number of active sidebar facets — a locked category page doesn't count its own category. */
export function countActiveFilters(params: CatalogParams, lockedCategory?: string): number {
  return (
    (params.brand ? 1 : 0) +
    (params.deal ? 1 : 0) +
    (params.minPrice !== undefined || params.maxPrice !== undefined ? 1 : 0) +
    (!lockedCategory && params.category ? 1 : 0)
  );
}

/** True when the visitor has narrowed the catalog — drives `noindex`. */
export function hasActiveFilters(params: CatalogParams): boolean {
  return Boolean(
    params.q ||
    params.category ||
    params.brand ||
    params.minPrice !== undefined ||
    params.maxPrice !== undefined ||
    params.deal ||
    (params.sort && params.sort !== 'newest') ||
    (params.page && params.page > 1),
  );
}

/** Build the `?…` query string for `GET /storefront/catalog/products`. */
export function toProductsQuery(
  params: CatalogParams,
  overrides: Partial<{ category: string; take: number }> = {},
): string {
  const take = overrides.take ?? CATALOG_PAGE_SIZE;
  const page = params.page ?? 1;
  const search = new URLSearchParams();
  search.set('take', String(take));
  search.set('skip', String((page - 1) * take));
  search.set('sort', params.sort ?? 'newest');
  if (params.q) search.set('search', params.q);
  const category = overrides.category ?? params.category;
  if (category) search.set('category', category);
  if (params.brand) search.set('brand', params.brand);
  if (params.minPrice !== undefined) search.set('minPrice', String(params.minPrice));
  if (params.maxPrice !== undefined) search.set('maxPrice', String(params.maxPrice));
  if (params.deal) search.set('isAmazingDeal', 'true');
  return `?${search.toString()}`;
}

/** Serialize catalog UI state back to a page `?…` string (empty when all defaults). */
export function toCatalogHref(pathname: string, params: CatalogParams): string {
  const search = new URLSearchParams();
  if (params.q) search.set('q', params.q);
  if (params.category) search.set('category', params.category);
  if (params.brand) search.set('brand', params.brand);
  if (params.minPrice !== undefined) search.set('minPrice', String(params.minPrice));
  if (params.maxPrice !== undefined) search.set('maxPrice', String(params.maxPrice));
  if (params.deal) search.set('deal', '1');
  if (params.sort && params.sort !== 'newest') search.set('sort', params.sort);
  if (params.page && params.page > 1) search.set('page', String(params.page));
  const query = search.toString();
  return query ? `${pathname}?${query}` : pathname;
}
