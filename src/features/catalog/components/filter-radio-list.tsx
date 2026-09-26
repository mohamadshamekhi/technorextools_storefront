'use client';

import { Icon } from '@/components/atoms';
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

export function FilterRadioList({
  legend,
  options,
  value,
  onChange,
  itemClassName,
}: FilterRadioListProps) {
  const items = [{ slug: undefined, title: 'همه' }, ...options];

  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="mb-2 text-sm font-bold">{legend}</legend>
      {items.map((option) => {
        const active = value === option.slug;
        return (
          <button
            key={option.slug ?? 'all'}
            type="button"
            onClick={() => onChange(option.slug)}
            aria-pressed={active}
            className={cn(
              'flex min-h-10 items-center justify-between gap-2 rounded-lg px-2.5 text-[13px] transition-colors',
              active
                ? 'text-brand-600 bg-brand-50 font-bold'
                : 'text-foreground-muted hover:bg-surface-muted hover:text-foreground',
            )}
          >
            <span className={cn('line-clamp-1 text-start', option.slug && itemClassName)}>
              {option.title}
            </span>
            {active ? <Icon name="check" className="size-3.5 shrink-0" /> : null}
          </button>
        );
      })}
    </fieldset>
  );
}
