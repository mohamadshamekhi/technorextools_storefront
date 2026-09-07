'use client';

import { useEffect, useMemo, useState } from 'react';

import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/catalog';
import { useCatalogFilters } from '../../hooks/use-catalog-filters';
import type { ParsedCatalogParams } from '../../utils/catalog-params';
import { buildFilterChips } from '../../utils/catalog-chips';
import { applyCatalogFilters, catalogBrands, categoryCounts } from '../../utils/catalog-filter';
import { ActiveFilterChips } from './active-filter-chips';
import { CatalogEmpty } from './catalog-empty';
import { CatalogResults } from './catalog-results';
import { CatalogSidebar } from './catalog-sidebar';
import { CatalogToolbar } from './catalog-toolbar';
import { LoadMoreButton } from './load-more-button';
import { MobileFilterDisclosure } from './mobile-filter-disclosure';

const PAGE_SIZE = 6;
const COUNTS = categoryCounts(PRODUCTS);
const BRANDS = catalogBrands(PRODUCTS);
const CATEGORY_LIST = CATEGORIES.filter((category) => COUNTS[category.slug]).map((category) => ({
  slug: category.slug,
  title: category.title,
  count: COUNTS[category.slug] ?? 0,
}));

const categoryTitle = (slug: string) =>
  CATEGORIES.find((category) => category.slug === slug)?.title ?? slug;

export function ProductCatalog({ initial }: { initial: ParsedCatalogParams }) {
  const catalog = useCatalogFilters(initial);
  const { filters, sort, view, setSort, setView, patch } = catalog;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const results = useMemo(
    () => applyCatalogFilters(PRODUCTS, filters, sort),
    [filters, sort],
  );

  useEffect(() => setVisibleCount(PAGE_SIZE), [filters, sort]);

  const chips = buildFilterChips(filters, patch, categoryTitle);
  const visible = results.slice(0, visibleCount);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">
      <MobileFilterDisclosure>
        <CatalogSidebar
          filters={filters}
          actions={catalog}
          categories={CATEGORY_LIST}
          brands={BRANDS}
        />
      </MobileFilterDisclosure>

      <div>
        <CatalogToolbar
          count={results.length}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
        />
        <ActiveFilterChips chips={chips} />

        {results.length === 0 ? (
          <CatalogEmpty onReset={catalog.reset} />
        ) : (
          <>
            <CatalogResults products={visible} view={view} />
            <LoadMoreButton
              remaining={results.length - visible.length}
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            />
          </>
        )}
      </div>
    </div>
  );
}
