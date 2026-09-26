'use client';

import { Icon } from '@/components/atoms';

import { SORT_OPTIONS } from '../services/catalog.query';
import { useCatalogParams } from '../hooks/use-catalog-params';

/** Sort control only — the surrounding bar is `CatalogToolbar` (server). */
export function CatalogSort({ lockedCategory }: { lockedCategory?: string }) {
  const { params, update } = useCatalogParams(lockedCategory);

  return (
    <label className="border-hairline bg-surface-muted hover:border-brand-300 flex min-h-11 items-center gap-2 rounded-xl border px-3 text-[13px] transition-colors">
      <Icon name="sort" className="text-foreground-muted size-4 shrink-0" />
      <span className="text-foreground-muted">مرتب‌سازی:</span>
      <select
        value={params.sort ?? 'newest'}
        onChange={(event) =>
          update({ sort: event.target.value as (typeof SORT_OPTIONS)[number]['value'] })
        }
        className="cursor-pointer bg-transparent text-sm font-bold outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
