'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

type Option = { slug: string; title: string };

type FilterRadioListProps = {
  legend: string;
  options: Option[];
  value: string | undefined;
  onChange: (slug: string | undefined) => void;
  /** Extra classes for option labels — e.g. `uppercase` for latin brand slugs. */
  itemClassName?: string;
};

/** Collapsed list length; a long list gets a search box and a "show all" toggle. */
const VISIBLE = 6;
const SEARCH_THRESHOLD = 8;

export function FilterRadioList({
  legend,
  options,
  value,
  onChange,
  itemClassName,
}: FilterRadioListProps) {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const needle = query.trim().toLowerCase();
  const matches = needle
    ? options.filter(
        (option) =>
          option.title.toLowerCase().includes(needle) || option.slug.toLowerCase().includes(needle),
      )
    : options;
  const collapsible = !needle && matches.length > VISIBLE + 2;
  let visible = collapsible && !showAll ? matches.slice(0, VISIBLE) : matches;
  // The active option stays reachable even when it sits below the fold.
  const selected = options.find((option) => option.slug === value);
  if (selected && !visible.includes(selected)) visible = [...visible, selected];
  const items = needle ? visible : [{ slug: undefined, title: 'همه' }, ...visible];

  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="sr-only">{legend}</legend>
      {options.length > SEARCH_THRESHOLD ? (
        <label className="border-hairline bg-surface-muted focus-within:border-brand-400 mb-1.5 flex h-10 items-center gap-2 rounded-xl border px-3 transition-colors">
          <Icon name="search" className="text-foreground-muted size-4 shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`جستجو در ${legend}…`}
            aria-label={`جستجو در ${legend}`}
            className="placeholder:text-foreground-muted w-full bg-transparent text-[13px] outline-none"
          />
        </label>
      ) : null}
      {items.map((option) => {
        const active = value === option.slug;
        return (
          <button
            key={option.slug ?? 'all'}
            type="button"
            onClick={() => onChange(option.slug)}
            aria-pressed={active}
            className={cn(
              'flex min-h-10 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-[13px] transition-colors',
              active
                ? 'text-brand-600 bg-brand-50 font-bold'
                : 'text-foreground-muted hover:bg-surface-muted hover:text-foreground',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'grid size-4 shrink-0 place-items-center rounded-full border-2 transition-colors',
                active ? 'border-brand-500' : 'border-hairline',
              )}
            >
              {active ? <span className="bg-brand-500 size-1.5 rounded-full" /> : null}
            </span>
            <span className={cn('line-clamp-1 text-start', option.slug && itemClassName)}>
              {option.title}
            </span>
          </button>
        );
      })}
      {needle && matches.length === 0 ? (
        <p className="text-foreground-muted px-2.5 py-2 text-[12.5px]">موردی پیدا نشد.</p>
      ) : null}
      {collapsible ? (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          aria-expanded={showAll}
          className="text-brand-600 hover:text-brand-700 mt-1 flex min-h-9 cursor-pointer items-center gap-1 self-start px-2.5 text-[12.5px] font-bold"
        >
          {showAll ? 'نمایش کمتر' : `نمایش همه (${toPersianDigits(matches.length)})`}
          <Icon
            name="chevronDown"
            className={cn('size-3.5 transition-transform', showAll && 'rotate-180')}
          />
        </button>
      ) : null}
    </fieldset>
  );
}
