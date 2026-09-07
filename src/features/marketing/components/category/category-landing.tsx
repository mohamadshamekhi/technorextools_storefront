'use client';

import { useEffect, useMemo, useState } from 'react';

import { routes } from '@/config/routes';

import { PRODUCTS } from '../../data/catalog';
import { useCatalogFilters } from '../../hooks/use-catalog-filters';
import type { Category } from '../../types';
import { buildFilterChips } from '../../utils/catalog-chips';
import { applyCatalogFilters, catalogBrands } from '../../utils/catalog-filter';
import type { ParsedCatalogParams } from '../../utils/catalog-params';
import { ActiveFilterChips } from '../catalog/active-filter-chips';
import { CatalogEmpty } from '../catalog/catalog-empty';
import { CatalogResults } from '../catalog/catalog-results';
import { CatalogSidebar } from '../catalog/catalog-sidebar';
import { CatalogToolbar } from '../catalog/catalog-toolbar';
import { LoadMoreButton } from '../catalog/load-more-button';
import { MobileFilterDisclosure } from '../catalog/mobile-filter-disclosure';
import { CategoryChips } from './category-chips';

const PAGE_SIZE = 6;

type CategoryLandingProps = {
  category: Category;
  siblings: Category[];
  initial: ParsedCatalogParams;
};

export function CategoryLanding({ category, siblings, initial }: CategoryLandingProps) {
  const catalog = useCatalogFilters(initial, {
    basePath: routes.category(category.slug),
    lockedCategories: [category.slug],
  });
  const { filters, sort, view, setSort, setView, patch } = catalog;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const scoped = useMemo(
    () => PRODUCTS.filter((product) => product.categorySlug === category.slug),
    [category.slug],
  );
  const brands = useMemo(() => catalogBrands(scoped), [scoped]);
  const results = useMemo(() => applyCatalogFilters(scoped, filters, sort), [scoped, filters, sort]);

  useEffect(() => setVisibleCount(PAGE_SIZE), [filters, sort]);

  const chips = buildFilterChips({ ...filters, categories: [] }, patch, () => '');
  const visible = results.slice(0, visibleCount);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">
      <MobileFilterDisclosure>
        <CatalogSidebar
          filters={filters}
          actions={catalog}
          categories={[]}
          brands={brands}
          hideCategories
        />
      </MobileFilterDisclosure>

      <div>
        <CategoryChips categories={siblings} activeSlug={category.slug} />
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
