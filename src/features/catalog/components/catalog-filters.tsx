'use client';

import { useCatalogParams } from '../hooks/use-catalog-params';
import { FilterRadioList } from './filter-radio-list';
import { PriceRangeFilter } from './price-range-filter';

type Option = { slug: string; title: string };

type CatalogFiltersProps = {
  categories: Option[];
  brands: Option[];
  lockedCategory?: string;
};

export function CatalogFilters({ categories, brands, lockedCategory }: CatalogFiltersProps) {
  const { params, update } = useCatalogParams(lockedCategory);

  const hasFilters =
    Boolean(params.brand || params.deal) ||
    params.minPrice !== undefined ||
    params.maxPrice !== undefined ||
    (!lockedCategory && Boolean(params.category));

  return (
    <aside className="flex flex-col gap-6">
      <button
        type="button"
        hidden={!hasFilters}
        onClick={() =>
          update({
            category: undefined,
            brand: undefined,
            deal: undefined,
            minPrice: undefined,
            maxPrice: undefined,
          })
        }
        className="text-brand-600 self-start text-[13px] font-bold"
      >
        پاک‌کردن فیلترها
      </button>

      <label className="flex items-center gap-2.5 text-sm font-bold">
        <input
          type="checkbox"
          checked={Boolean(params.deal)}
          onChange={(event) => update({ deal: event.target.checked ? '1' : undefined })}
          className="accent-brand-500 size-4"
        />
        فقط پیشنهاد شگفت‌انگیز
      </label>

      {!lockedCategory && categories.length > 0 ? (
        <FilterRadioList
          legend="دسته‌بندی"
          options={categories}
          value={params.category}
          onChange={(slug) => update({ category: slug })}
        />
      ) : null}

      {brands.length > 0 ? (
        <FilterRadioList
          legend="برند"
          options={brands}
          value={params.brand}
          onChange={(slug) => update({ brand: slug })}
        />
      ) : null}

      <PriceRangeFilter
        min={params.minPrice}
        max={params.maxPrice}
        onChange={(next) => update(next)}
      />
    </aside>
  );
}
