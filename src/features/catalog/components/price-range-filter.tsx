'use client';

import { useEffect, useState, type FormEvent } from 'react';

import { cn } from '@/lib/utils';

import { PRICE_PRESETS } from '../data/price-presets';
import { digitsToNumber, formatDigits, toDigits } from '../utils/price-input';
import { PriceInput } from './price-input';

type PriceRange = { minPrice?: number; maxPrice?: number };

type PriceRangeFilterProps = {
  min: number | undefined;
  max: number | undefined;
  onChange: (next: PriceRange) => void;
};

const digitsOf = (value: number | undefined) => (value ? String(value) : '');

/** Price facet: one-tap brackets + a free range applied explicitly (Enter or the button). */
export function PriceRangeFilter({ min, max, onChange }: PriceRangeFilterProps) {
  const [lo, setLo] = useState(digitsOf(min));
  const [hi, setHi] = useState(digitsOf(max));

  useEffect(() => setLo(digitsOf(min)), [min]);
  useEffect(() => setHi(digitsOf(max)), [max]);

  const next = { minPrice: digitsToNumber(lo), maxPrice: digitsToNumber(hi) };
  const dirty = next.minPrice !== min || next.maxPrice !== max;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const { minPrice, maxPrice } = next;
    // A reversed range is a typo, not an empty result — swap it.
    if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice)
      onChange({ minPrice: maxPrice, maxPrice: minPrice });
    else onChange(next);
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="sr-only">بازهٔ قیمت (تومان)</legend>
      <div className="flex flex-wrap gap-1.5">
        {PRICE_PRESETS.map((preset) => {
          const active = preset.minPrice === min && preset.maxPrice === max;
          return (
            <button
              key={preset.label}
              type="button"
              aria-pressed={active}
              onClick={() =>
                onChange(active ? {} : { minPrice: preset.minPrice, maxPrice: preset.maxPrice })
              }
              className={cn(
                'min-h-8 cursor-pointer rounded-full border px-3 text-[12px] font-bold transition-colors',
                active
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-hairline text-foreground-muted hover:border-brand-300 hover:text-foreground',
              )}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
      <form onSubmit={submit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <PriceInput
            label="از"
            ariaLabel="حداقل قیمت"
            value={formatDigits(lo)}
            onChange={(raw) => setLo(toDigits(raw))}
          />
          <PriceInput
            label="تا"
            ariaLabel="حداکثر قیمت"
            value={formatDigits(hi)}
            onChange={(raw) => setHi(toDigits(raw))}
          />
        </div>
        <button
          type="submit"
          disabled={!dirty}
          className="bg-brand-500 hover:bg-brand-600 disabled:bg-surface-sunken disabled:text-foreground-muted min-h-10 cursor-pointer rounded-xl text-[13px] font-bold text-white transition-colors disabled:cursor-not-allowed"
        >
          اعمال بازهٔ قیمت
        </button>
      </form>
    </fieldset>
  );
}
