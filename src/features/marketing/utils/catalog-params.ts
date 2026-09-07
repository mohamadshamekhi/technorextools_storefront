import { z } from 'zod';

import {
  CATALOG_MAX_PRICE,
  type CatalogFilters,
  type CatalogView,
  type SortKey,
} from '../types/catalog';

export const DEFAULT_FILTERS: CatalogFilters = {
  categories: [],
  brands: [],
  maxPrice: CATALOG_MAX_PRICE,
  minDiscount: 0,
  minRating: 0,
  usage: 'all',
  inStockOnly: false,
};

const csv = z
  .string()
  .optional()
  .transform((value) => (value ? value.split(',').map((s) => s.trim()).filter(Boolean) : []));

/** Raw `searchParams` shape — every field optional, every value validated. */
export const catalogParamsSchema = z.object({
  category: csv,
  brand: csv,
  maxPrice: z.coerce.number().int().positive().max(CATALOG_MAX_PRICE).optional(),
  discount: z.coerce.number().pipe(z.union([z.literal(0), z.literal(10), z.literal(20)])).optional(),
  rating: z.coerce.number().pipe(z.union([z.literal(0), z.literal(4), z.literal(4.5)])).optional(),
  usage: z.enum(['all', 'industrial', 'home']).optional(),
  stock: z.enum(['1']).optional(),
  sort: z.enum(['new', 'price-asc', 'price-desc', 'popular']).optional(),
  view: z.enum(['grid', 'list']).optional(),
});

export type CatalogQuery = z.infer<typeof catalogParamsSchema>;

export type ParsedCatalogParams = {
  filters: CatalogFilters;
  sort: SortKey;
  view: CatalogView;
};

/** Turn validated query params into the catalog's working state. */
export function toCatalogState(query: CatalogQuery): ParsedCatalogParams {
  return {
    filters: {
      categories: query.category ?? [],
      brands: query.brand ?? [],
      maxPrice: query.maxPrice ?? CATALOG_MAX_PRICE,
      minDiscount: query.discount ?? 0,
      minRating: query.rating ?? 0,
      usage: query.usage ?? 'all',
      inStockOnly: query.stock === '1',
    },
    sort: query.sort ?? 'new',
    view: query.view ?? 'grid',
  };
}

/** Serialize working state back to a `?…` string (empty when all defaults). */
export function toCatalogSearch({ filters, sort, view }: ParsedCatalogParams): string {
  const params = new URLSearchParams();
  if (filters.categories.length) params.set('category', filters.categories.join(','));
  if (filters.brands.length) params.set('brand', filters.brands.join(','));
  if (filters.maxPrice < CATALOG_MAX_PRICE) params.set('maxPrice', String(filters.maxPrice));
  if (filters.minDiscount) params.set('discount', String(filters.minDiscount));
  if (filters.minRating) params.set('rating', String(filters.minRating));
  if (filters.usage !== 'all') params.set('usage', filters.usage);
  if (filters.inStockOnly) params.set('stock', '1');
  if (sort !== 'new') params.set('sort', sort);
  if (view !== 'grid') params.set('view', view);
  const query = params.toString();
  return query ? `?${query}` : '';
}

/** True when the visitor has narrowed the catalog in any way (drives `noindex`). */
export function hasActiveFilters(filters: CatalogFilters): boolean {
  return (
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.maxPrice < CATALOG_MAX_PRICE ||
    filters.minDiscount > 0 ||
    filters.minRating > 0 ||
    filters.usage !== 'all' ||
    filters.inStockOnly
  );
}
