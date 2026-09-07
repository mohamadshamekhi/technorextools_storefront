'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { routes } from '@/config/routes';

import type { CatalogFilters, CatalogView, SortKey } from '../types/catalog';
import { DEFAULT_FILTERS, type ParsedCatalogParams, toCatalogSearch } from '../utils/catalog-params';

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

type CatalogFilterOptions = {
  /** Path the URL is mirrored onto (default: the all-products catalog). */
  basePath?: string;
  /** Category slugs the page is permanently scoped to — kept on reset, hidden from the URL. */
  lockedCategories?: string[];
};

/** Owns catalog filter/sort/view state and mirrors it into the URL (no RSC round-trip). */
export function useCatalogFilters(
  initial: ParsedCatalogParams,
  { basePath = routes.products, lockedCategories }: CatalogFilterOptions = {},
) {
  const [filters, setFilters] = useState<CatalogFilters>(initial.filters);
  const [sort, setSort] = useState<SortKey>(initial.sort);
  const [view, setView] = useState<CatalogView>(initial.view);

  useEffect(() => {
    const shown = lockedCategories ? { ...filters, categories: [] } : filters;
    const search = toCatalogSearch({ filters: shown, sort, view });
    window.history.replaceState(null, '', `${basePath}${search}`);
  }, [filters, sort, view, basePath, lockedCategories]);

  const patch = useCallback(
    (next: Partial<CatalogFilters>) => setFilters((current) => ({ ...current, ...next })),
    [],
  );

  const actions = useMemo(
    () => ({
      toggleCategory: (slug: string) =>
        setFilters((c) => ({ ...c, categories: toggle(c.categories, slug) })),
      toggleBrand: (name: string) => setFilters((c) => ({ ...c, brands: toggle(c.brands, name) })),
      setMaxPrice: (maxPrice: number) => patch({ maxPrice }),
      setMinDiscount: (minDiscount: number) => patch({ minDiscount }),
      setMinRating: (minRating: number) => patch({ minRating }),
      setUsage: (usage: CatalogFilters['usage']) => patch({ usage }),
      toggleInStock: () => setFilters((c) => ({ ...c, inStockOnly: !c.inStockOnly })),
      reset: () =>
        setFilters({ ...DEFAULT_FILTERS, categories: lockedCategories ?? DEFAULT_FILTERS.categories }),
    }),
    [patch, lockedCategories],
  );

  return { filters, sort, view, setSort, setView, patch, ...actions };
}
