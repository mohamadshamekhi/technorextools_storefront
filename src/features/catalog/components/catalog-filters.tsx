'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { useCatalogParams } from '../hooks/use-catalog-params';
import type { CategoryOption } from '../utils/category-tree';
import { CategoryTreeFilter } from './category-tree-filter';
import { FilterRadioList } from './filter-radio-list';
import { PriceRangeFilter } from './price-range-filter';

type Option = { slug: string; title: string };

type CatalogFiltersProps = {
  categoryTree: CategoryOption[];
  brands: Option[];
  lockedCategory?: string;
};

export function CatalogFilters({ categoryTree, brands, lockedCategory }: CatalogFiltersProps) {
  const { params, update } = useCatalogParams(lockedCategory);
  const [open, setOpen] = useState(false);

  const activeCount =
    (params.brand ? 1 : 0) +
    (params.deal ? 1 : 0) +
    (params.minPrice !== undefined ? 1 : 0) +
    (params.maxPrice !== undefined ? 1 : 0) +
    (!lockedCategory && params.category ? 1 : 0);

  const clearAll = () =>
    update({
      category: undefined,
      brand: undefined,
      deal: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });

  return (
    <aside className="border-hairline bg-surface rounded-card border p-5 shadow-(--shadow-soft) lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <span className="bg-brand-50 text-brand-600 grid size-8 place-items-center rounded-lg">
            <Icon name="sliders" className="size-4" />
          </span>
          فیلترها
          {activeCount > 0 ? (
            <span className="bg-brand-500 grid size-5 place-items-center rounded-full text-[11px] font-black text-white tabular-nums">
              {toPersianDigits(activeCount)}
            </span>
          ) : null}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            hidden={activeCount === 0}
            onClick={clearAll}
            className="text-foreground-muted hover:text-sale cursor-pointer px-2 text-[13px] font-bold transition-colors"
          >
            پاک‌کردن
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="border-hairline grid size-9 cursor-pointer place-items-center rounded-lg border lg:hidden"
          >
            <span className="sr-only">{open ? 'بستن فیلترها' : 'نمایش فیلترها'}</span>
            <Icon
              name="chevronDown"
              className={cn('size-4 transition-transform', open && 'rotate-180')}
            />
          </button>
        </div>
      </div>

      <div className={cn('mt-5 flex-col gap-5', open ? 'flex' : 'hidden lg:flex')}>
        <label className="border-hairline bg-surface-muted hover:border-brand-300 has-checked:border-sale/40 has-checked:bg-sale/5 flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3 text-[13px] font-bold transition-colors">
          <input
            type="checkbox"
            checked={Boolean(params.deal)}
            onChange={(event) => update({ deal: event.target.checked ? '1' : undefined })}
            className="accent-sale size-4 shrink-0"
          />
          <Icon name="fire" className="text-sale size-4 shrink-0" />
          <span className="truncate">فقط شگفت‌انگیزها</span>
        </label>

        {!lockedCategory && categoryTree.length > 0 ? (
          <div className="border-hairline border-t pt-5">
            <CategoryTreeFilter
              tree={categoryTree}
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
              itemClassName="uppercase"
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
      </div>
    </aside>
  );
}
