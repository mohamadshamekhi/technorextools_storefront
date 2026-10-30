'use client';

import { useEffect, useState, type FormEvent } from 'react';

import { cn } from '@/lib/utils';

import { PRICE_PRESETS } from '../data/price-presets';
import { digitsToNumber, formatDigits, toDigits } from '../utils/price-input';
import { PriceInput } from './price-input';
import { PriceSlider } from './price-slider';

type PriceRange = { minPrice?: number; maxPrice?: number };

type PriceRangeFilterProps = {
  min: number | undefined;
  max: number | undefined;
  onChange: (next: PriceRange) => void;
};

const digitsOf = (value: number | undefined) => (value ? String(value) : '');

/** Price facet: brackets apply at once; slider + typed range apply explicitly. */
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
    <fieldset className="flex flex-col gap-4">
      <legend className="sr-only">بازهٔ قیمت (تومان)</legend>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="px-1 pt-1">
          <PriceSlider
            lo={next.minPrice}
            hi={next.maxPrice}
            onChange={(low, high) => {
              setLo(digitsOf(low));
              setHi(digitsOf(high));
            }}
          />
        </div>
        <div className="flex items-stretch gap-2">
          <PriceInput
            label="حداقل (تومان)"
            value={formatDigits(lo)}
            onChange={(raw) => setLo(toDigits(raw))}
          />
          <PriceInput
            label="حداکثر (تومان)"
            value={formatDigits(hi)}
            onChange={(raw) => setHi(toDigits(raw))}
          />
        </div>
        <button
          type="submit"
          disabled={!dirty}
          className={cn(
            'min-h-10 rounded-xl text-[13px] font-bold transition-all',
            dirty
              ? 'bg-brand-500 hover:bg-brand-600 cursor-pointer text-white shadow-(--shadow-brand)'
              : 'bg-surface-muted text-foreground-muted cursor-not-allowed',
          )}
        >
          اعمال بازهٔ قیمت
        </button>
      </form>
      <div className="grid grid-cols-2 gap-1.5">
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
                'min-h-9 cursor-pointer rounded-lg border text-[11.5px] font-bold transition-colors',
                active
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-hairline bg-surface text-foreground-muted hover:border-brand-300 hover:text-brand-700',
              )}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
