'use client';

import { Icon } from '@/components/atoms';
import { formatToman } from '@/lib/persian';

import { useCatalogParams } from '../hooks/use-catalog-params';
import { CLEAR_FILTERS_PATCH, type CatalogParams } from '../services/catalog.query';

type Option = { slug: string; title: string };
type Chip = { key: string; label: string; patch: Partial<CatalogParams> };

const titleOf = (options: Option[], slug: string) =>
  options.find((option) => option.slug === slug)?.title ?? slug;

type ActiveFilterChipsProps = {
  categories: Option[];
  brands: Option[];
  lockedCategory?: string;
};

/** Removable summary of the current filters — the fastest way back out of a dead end. */
export function ActiveFilterChips({ categories, brands, lockedCategory }: ActiveFilterChipsProps) {
  const { params, update } = useCatalogParams(lockedCategory);
  const chips: Chip[] = [];

  if (!lockedCategory && params.category)
    chips.push({
      key: 'category',
      label: titleOf(categories, params.category),
      patch: { category: undefined },
    });
  if (params.brand)
    chips.push({ key: 'brand', label: titleOf(brands, params.brand), patch: { brand: undefined } });
  if (params.deal) chips.push({ key: 'deal', label: 'فقط شگفت‌انگیز', patch: { deal: undefined } });
  if (params.minPrice !== undefined)
    chips.push({
      key: 'minPrice',
      label: `از ${formatToman(params.minPrice)} تومان`,
      patch: { minPrice: undefined },
    });
  if (params.maxPrice !== undefined)
    chips.push({
      key: 'maxPrice',
      label: `تا ${formatToman(params.maxPrice)} تومان`,
      patch: { maxPrice: undefined },
    });

  if (chips.length === 0) return null;

  return (
    <ul className="border-hairline flex flex-wrap items-center gap-2 border-t pt-4">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={() => update(chip.patch)}
            className="bg-brand-50 text-brand-700 hover:bg-brand-100 flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[12.5px] font-bold transition-colors"
          >
            {chip.label}
            <Icon name="close" className="size-3" aria-label="حذف فیلتر" />
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => update(CLEAR_FILTERS_PATCH)}
          className="text-foreground-muted hover:text-sale min-h-8 cursor-pointer px-2 text-[12.5px] font-bold transition-colors"
        >
          پاک‌کردن همه
        </button>
      </li>
    </ul>
  );
}
