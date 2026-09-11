'use client';

import { useEffect, useState } from 'react';

type PriceRangeFilterProps = {
  min: number | undefined;
  max: number | undefined;
  onChange: (next: { minPrice?: number; maxPrice?: number }) => void;
};

const toNum = (raw: string): number | undefined => {
  const value = Number(raw.replace(/\D/g, ''));
  return Number.isFinite(value) && value > 0 ? value : undefined;
};

export function PriceRangeFilter({ min, max, onChange }: PriceRangeFilterProps) {
  const [lo, setLo] = useState(min ? String(min) : '');
  const [hi, setHi] = useState(max ? String(max) : '');

  useEffect(() => setLo(min ? String(min) : ''), [min]);
  useEffect(() => setHi(max ? String(max) : ''), [max]);

  const commit = () => onChange({ minPrice: toNum(lo), maxPrice: toNum(hi) });

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm font-bold">بازهٔ قیمت (تومان)</legend>
      <div className="flex items-center gap-2">
        <input
          inputMode="numeric"
          value={lo}
          onChange={(event) => setLo(event.target.value)}
          onBlur={commit}
          placeholder="از"
          aria-label="حداقل قیمت"
          className="border-hairline bg-surface h-10 w-full rounded-xl border px-3 text-sm outline-none"
        />
        <span className="text-foreground-muted">—</span>
        <input
          inputMode="numeric"
          value={hi}
          onChange={(event) => setHi(event.target.value)}
          onBlur={commit}
          placeholder="تا"
          aria-label="حداکثر قیمت"
          className="border-hairline bg-surface h-10 w-full rounded-xl border px-3 text-sm outline-none"
        />
      </div>
    </fieldset>
  );
}
