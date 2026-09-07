import type { Product } from '../types';
import type { CatalogFilters, SortKey } from '../types/catalog';
import { discountPercent } from './persian';

function matches(product: Product, filters: CatalogFilters): boolean {
  if (filters.categories.length && !filters.categories.includes(product.categorySlug)) return false;
  if (filters.brands.length && !filters.brands.includes(product.brand)) return false;
  if (product.price > filters.maxPrice) return false;
  if (filters.usage !== 'all' && product.usage !== filters.usage) return false;
  if (filters.inStockOnly && !product.inStock) return false;
  if (filters.minRating && product.rating < filters.minRating) return false;
  if (filters.minDiscount) {
    const off = product.compareAt ? discountPercent(product.price, product.compareAt) : 0;
    if (off < filters.minDiscount) return false;
  }
  return true;
}

const SORTERS: Record<SortKey, (a: Product, b: Product) => number> = {
  new: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  popular: (a, b) => b.reviews - a.reviews,
};

/** Filter + sort the catalogue for the current URL state. */
export function applyCatalogFilters(
  products: Product[],
  filters: CatalogFilters,
  sort: SortKey,
): Product[] {
  return [...products.filter((product) => matches(product, filters))].sort(SORTERS[sort]);
}

/** How many products sit in each category slug (facet badge counts). */
export function categoryCounts(products: Product[]): Record<string, number> {
  return products.reduce<Record<string, number>>((acc, product) => {
    acc[product.categorySlug] = (acc[product.categorySlug] ?? 0) + 1;
    return acc;
  }, {});
}

/** Distinct brand names in catalogue order. */
export function catalogBrands(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.brand))];
}
