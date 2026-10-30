'use client';

import { Icon } from '@/components/atoms';

import type { CatalogParams } from '../services/catalog.query';
import type { CategoryOption } from '../utils/category-tree';
import { priceRangeSummary } from '../utils/price-input';
import { CategoryTreeFilter } from './category-tree-filter';
import { FilterRadioList } from './filter-radio-list';
import { FilterSection } from './filter-section';
import { PriceRangeFilter } from './price-range-filter';

type Option = { slug: string; title: string };

type CatalogFilterBodyProps = {
  params: CatalogParams;
  update: (patch: Partial<CatalogParams>) => void;
  categoryTree: CategoryOption[];
  categories: Option[];
  brands: Option[];
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
    <div className="flex flex-col gap-3">
      <label className="border-hairline bg-surface-muted hover:border-sale/40 has-checked:border-sale/40 has-checked:bg-sale/5 flex min-h-12 cursor-pointer items-center gap-2.5 rounded-xl border px-3 text-[13px] font-bold transition-colors">
        <span className="bg-sale/10 text-sale grid size-7 shrink-0 place-items-center rounded-lg">
          <Icon name="fire" className="size-4" />
        </span>
        <span className="flex-1 truncate">فقط شگفت‌انگیزها</span>
        <input
          type="checkbox"
          role="switch"
          checked={Boolean(params.deal)}
          onChange={(event) => update({ deal: event.target.checked ? '1' : undefined })}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="bg-hairline peer-checked:bg-sale peer-focus-visible:ring-sale/40 relative h-5 w-9 shrink-0 rounded-full transition-colors peer-focus-visible:ring-2 after:absolute after:start-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:-translate-x-4"
        />
      </label>

      {!lockedCategory && categoryTree.length > 0 ? (
        <FilterSection title="دسته‌بندی" summary={titleOf(categories, params.category)}>
          <CategoryTreeFilter
            tree={categoryTree}
            value={params.category}
            onChange={(slug) => update({ category: slug })}
          />
        </FilterSection>
      ) : null}

      {brands.length > 0 ? (
        <FilterSection title="برند" summary={titleOf(brands, params.brand)}>
          <FilterRadioList
            legend="برند"
            options={brands}
            itemClassName="uppercase"
            value={params.brand}
            onChange={(slug) => update({ brand: slug })}
          />
        </FilterSection>
      ) : null}

      <FilterSection
        title="قیمت (تومان)"
        summary={priceRangeSummary(params.minPrice, params.maxPrice)}
      >
        <PriceRangeFilter
          min={params.minPrice}
          max={params.maxPrice}
          onChange={(next) => update(next)}
        />
      </FilterSection>
    </div>
  );
}
