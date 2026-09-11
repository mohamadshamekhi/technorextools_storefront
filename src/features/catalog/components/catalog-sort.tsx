'use client';

import { toPersianDigits } from '@/lib/persian';

import { SORT_OPTIONS } from '../services/catalog.query';
import { useCatalogParams } from '../hooks/use-catalog-params';

export function CatalogSort({ total, lockedCategory }: { total: number; lockedCategory?: string }) {
  const { params, update } = useCatalogParams(lockedCategory);

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <p className="text-foreground-muted text-[13.5px]">
        <span className="text-foreground font-bold">{toPersianDigits(total)}</span> محصول یافت شد
      </p>
      <label className="flex items-center gap-2 text-[13px]">
        <span className="text-foreground-muted">مرتب‌سازی:</span>
        <select
          value={params.sort ?? 'newest'}
          onChange={(event) => update({ sort: event.target.value as (typeof SORT_OPTIONS)[number]['value'] })}
          className="border-hairline bg-surface h-9 rounded-lg border px-2 text-sm outline-none"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
