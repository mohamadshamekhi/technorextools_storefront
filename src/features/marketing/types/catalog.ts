import type { ProductUsage } from './index';

/** How the results grid is ordered. */
export type SortKey = 'new' | 'price-asc' | 'price-desc' | 'popular';

/** A removable filter pill shown above the results. */
export type FilterChip = { key: string; label: string; onRemove: () => void };

/** Grid vs. list rendering of the results. */
export type CatalogView = 'grid' | 'list';

/** The full filter state the catalog page reads from the URL and mutates. */
export type CatalogFilters = {
  /** Category slugs; empty means "every category". */
  categories: string[];
  /** Brand names; empty means "every brand". */
  brands: string[];
  /** Upper price bound in toman. */
  maxPrice: number;
  /** Minimum whole-percent discount (0 = off). */
  minDiscount: number;
  /** Minimum average rating (0 = off). */
  minRating: number;
  /** Usage segment, or `'all'`. */
  usage: ProductUsage | 'all';
  /** Hide out-of-stock items. */
  inStockOnly: boolean;
};

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'new', label: 'جدیدترین' },
  { key: 'price-asc', label: 'ارزان‌ترین' },
  { key: 'price-desc', label: 'گران‌ترین' },
  { key: 'popular', label: 'پرفروش‌ترین' },
];

export const DISCOUNT_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: 'همه' },
  { value: 10, label: 'بیشتر از ۱۰٪' },
  { value: 20, label: 'بیشتر از ۲۰٪' },
];

export const RATING_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: 'همه امتیازها' },
  { value: 4.5, label: '۴.۵ به بالا' },
  { value: 4, label: '۴ به بالا' },
];

export const USAGE_OPTIONS: { value: CatalogFilters['usage']; label: string }[] = [
  { value: 'all', label: 'همه' },
  { value: 'industrial', label: 'صنعتی' },
  { value: 'home', label: 'خانگی' },
];

export const CATALOG_MAX_PRICE = 40_000_000;
