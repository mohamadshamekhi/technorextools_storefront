'use client';

import { Icon } from '@/components/atoms';

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
    <aside className="border-hairline bg-surface flex flex-col gap-6 rounded-card border p-5 shadow-(--shadow-soft) lg:sticky lg:top-24">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <Icon name="sliders" className="text-brand-600 size-4" />
          فیلترها
        </h2>
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
          className="text-brand-600 text-[13px] font-bold"
        >
          پاک‌کردن
        </button>
      </div>

      <label className="border-hairline bg-surface-muted hover:border-brand-300 flex min-h-11 items-center gap-2.5 rounded-xl border px-3 text-sm font-bold transition-colors">
        <input
          type="checkbox"
          checked={Boolean(params.deal)}
          onChange={(event) => update({ deal: event.target.checked ? '1' : undefined })}
          className="accent-brand-500 size-4"
        />
        فقط پیشنهاد شگفت‌انگیز
      </label>

      {!lockedCategory && categories.length > 0 ? (
        <div className="border-hairline border-t pt-5">
          <FilterRadioList
            legend="دسته‌بندی"
            options={categories}
            value={params.category}
            onChange={(slug) => update({ category: slug })}
          />
        </div>
      ) : null}

      {brands.length > 0 ? (
        <div className="border-hairline border-t pt-5">
          <FilterRadioList
            legend="برند"
            options={brands}
            value={params.brand}
            onChange={(slug) => update({ brand: slug })}
          />
        </div>
      ) : null}

      <div className="border-hairline border-t pt-5">
        <PriceRangeFilter
          min={params.minPrice}
          max={params.maxPrice}
          onChange={(next) => update(next)}
        />
      </div>
    </aside>
  );
}
