'use client';

import { cn } from '@/lib/utils';

type Option = { slug: string; title: string };

type FilterRadioListProps = {
  legend: string;
  options: Option[];
  value: string | undefined;
  onChange: (slug: string | undefined) => void;
};

export function FilterRadioList({ legend, options, value, onChange }: FilterRadioListProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm font-bold">{legend}</legend>
      <button
        type="button"
        onClick={() => onChange(undefined)}
        className={cn(
          'text-start text-[13px] transition-colors',
          value === undefined ? 'text-brand-600 font-bold' : 'text-foreground-muted hover:text-foreground',
        )}
      >
        همه
      </button>
      {options.map((option) => (
        <button
          key={option.slug}
          type="button"
          onClick={() => onChange(option.slug)}
          className={cn(
            'text-start text-[13px] transition-colors',
            value === option.slug
              ? 'text-brand-600 font-bold'
              : 'text-foreground-muted hover:text-foreground',
          )}
        >
          {option.title}
        </button>
      ))}
    </fieldset>
  );
}
