'use client';

import type { CatalogParams } from '../services/catalog.query';
import type { CategoryOption } from '../utils/category-tree';
import { priceRangeSummary } from '../utils/price-input';
import { BrandFilter, type BrandOption } from './brand-filter';
import { CategoryTreeFilter } from './category-tree-filter';
import { DealToggle } from './deal-toggle';
import { FilterSection } from './filter-section';
import { PriceRangeFilter } from './price-range-filter';

type Option = { slug: string; title: string };

type CatalogFilterBodyProps = {
  params: CatalogParams;
  update: (patch: Partial<CatalogParams>) => void;
  categoryTree: CategoryOption[];
  categories: Option[];
  brands: BrandOption[];
  lockedCategory?: string;
};

const titleOf = (options: Option[], slug: string | undefined) =>
  slug ? (options.find((option) => option.slug === slug)?.title ?? slug) : undefined;

/** The facet stack itself — shared by the desktop sidebar and the mobile sheet. */
export function CatalogFilterBody({
  params,
  update,
  categoryTree,
  categories,
  brands,
  lockedCategory,
}: CatalogFilterBodyProps) {
  return (
    <div className="flex flex-col gap-2">
      <DealToggle
        checked={Boolean(params.deal)}
        onChange={(checked) => update({ deal: checked ? '1' : undefined })}
      />

      <div className="mt-2 flex flex-col">
        {!lockedCategory && categoryTree.length > 0 ? (
          <FilterSection
            title="دسته‌بندی"
            icon="grid"
            summary={titleOf(categories, params.category)}
          >
            <CategoryTreeFilter
              tree={categoryTree}
              value={params.category}
              onChange={(slug) => update({ category: slug })}
            />
          </FilterSection>
        ) : null}

        {brands.length > 0 ? (
          <FilterSection title="برند" icon="shield" summary={titleOf(brands, params.brand)}>
            <BrandFilter
              brands={brands}
              value={params.brand}
              onChange={(slug) => update({ brand: slug })}
            />
          </FilterSection>
        ) : null}

        <FilterSection
          title="قیمت"
          icon="wallet"
          summary={priceRangeSummary(params.minPrice, params.maxPrice)}
        >
          <PriceRangeFilter
            min={params.minPrice}
            max={params.maxPrice}
            onChange={(next) => update(next)}
          />
        </FilterSection>
      </div>
    </div>
  );
}
