import { CATALOG_MAX_PRICE, type CatalogFilters, type FilterChip } from '../types/catalog';
import { formatToman, toPersianDigits } from './persian';

type Patch = (next: Partial<CatalogFilters>) => void;

/** Derive the removable filter pills shown above the results. */
export function buildFilterChips(
  filters: CatalogFilters,
  patch: Patch,
  categoryTitle: (slug: string) => string,
): FilterChip[] {
  const chips: FilterChip[] = [];

  for (const slug of filters.categories) {
    chips.push({
      key: `cat:${slug}`,
      label: categoryTitle(slug),
      onRemove: () => patch({ categories: filters.categories.filter((s) => s !== slug) }),
    });
  }
  for (const brand of filters.brands) {
    chips.push({
      key: `brand:${brand}`,
      label: brand,
      onRemove: () => patch({ brands: filters.brands.filter((b) => b !== brand) }),
    });
  }
  if (filters.maxPrice < CATALOG_MAX_PRICE) {
    chips.push({
      key: 'price',
      label: `تا ${formatToman(filters.maxPrice)} تومان`,
      onRemove: () => patch({ maxPrice: CATALOG_MAX_PRICE }),
    });
  }
  if (filters.minDiscount) {
    chips.push({
      key: 'discount',
      label: `تخفیف ${toPersianDigits(filters.minDiscount)}٪ به بالا`,
      onRemove: () => patch({ minDiscount: 0 }),
    });
  }
  if (filters.minRating) {
    chips.push({
      key: 'rating',
      label: `امتیاز ${toPersianDigits(filters.minRating)} به بالا`,
      onRemove: () => patch({ minRating: 0 }),
    });
  }
  if (filters.usage !== 'all') {
    chips.push({
      key: 'usage',
      label: filters.usage === 'industrial' ? 'کاربری صنعتی' : 'کاربری خانگی',
      onRemove: () => patch({ usage: 'all' }),
    });
  }
  if (filters.inStockOnly) {
    chips.push({
      key: 'stock',
      label: 'فقط کالاهای موجود',
      onRemove: () => patch({ inStockOnly: false }),
    });
  }

  return chips;
}
