'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

export type BrandOption = { slug: string; title: string; logoUrl: string | null };

type BrandFilterProps = {
  brands: BrandOption[];
  value: string | undefined;
  onChange: (slug: string | undefined) => void;
};

const VISIBLE = 8;

/** Brand facet as a 2-column logo/wordmark tile grid; tapping the active tile clears it. */
export function BrandFilter({ brands, value, onChange }: BrandFilterProps) {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const needle = query.trim().toLowerCase();
  const matches = needle
    ? brands.filter((b) => b.title.toLowerCase().includes(needle) || b.slug.includes(needle))
    : brands;
  const collapsible = !needle && matches.length > VISIBLE;
  let visible = collapsible && !showAll ? matches.slice(0, VISIBLE) : matches;
  // The active brand stays reachable even when it sits below the fold.
  const selected = brands.find((brand) => brand.slug === value);
  if (selected && !visible.includes(selected)) visible = [selected, ...visible.slice(0, -1)];

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="sr-only">برند</legend>
      {brands.length > VISIBLE ? (
        <label className="bg-surface-muted focus-within:bg-surface focus-within:ring-brand-200 flex h-10 items-center gap-2 rounded-xl px-3 ring-1 ring-transparent transition">
          <Icon name="search" className="text-foreground-muted size-4 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجوی برند…"
            aria-label="جستجوی برند"
            className="placeholder:text-foreground-muted w-full bg-transparent text-[13px] outline-none"
          />
        </label>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        {visible.map((brand) => {
          const active = brand.slug === value;
          return (
            <button
              key={brand.slug}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? undefined : brand.slug)}
              className={cn(
                'group relative grid h-14 cursor-pointer place-items-center rounded-xl border px-2 transition-all duration-200',
                active
                  ? 'border-brand-500 bg-brand-50 ring-brand-500 shadow-(--shadow-brand) ring-1'
                  : 'border-hairline bg-surface hover:border-brand-300 hover:-translate-y-0.5 hover:shadow-(--shadow-soft)',
              )}
            >
              {brand.logoUrl ? (
                <Image
                  src={brand.logoUrl}
                  alt={brand.title}
                  width={96}
                  height={32}
                  className={cn(
                    'h-7 w-auto object-contain transition',
                    !active &&
                      'opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0',
                  )}
                />
              ) : (
                <span
                  className={cn(
                    'line-clamp-1 text-[12.5px] font-black tracking-wide uppercase transition-colors',
                    active ? 'text-brand-700' : 'text-foreground-muted group-hover:text-foreground',
                  )}
                >
                  {brand.title}
                </span>
              )}
              {active ? (
                <span className="bg-brand-500 absolute -start-1.5 -top-1.5 grid size-5 place-items-center rounded-full text-white shadow-sm">
                  <Icon name="check" className="size-3" />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {needle && matches.length === 0 ? (
        <p className="text-foreground-muted py-2 text-center text-[12.5px]">برندی پیدا نشد.</p>
      ) : null}
      {collapsible ? (
        <button
          type="button"
          onClick={() => setShowAll((open) => !open)}
          aria-expanded={showAll}
          className="text-brand-600 hover:bg-brand-50 flex min-h-9 cursor-pointer items-center justify-center gap-1 rounded-lg text-[12.5px] font-bold transition-colors"
        >
          {showAll ? 'نمایش کمتر' : `همه‌ی ${toPersianDigits(matches.length)} برند`}
          <Icon
            name="chevronDown"
            className={cn('size-3.5 transition-transform', showAll && 'rotate-180')}
          />
        </button>
      ) : null}
    </fieldset>
  );
}
