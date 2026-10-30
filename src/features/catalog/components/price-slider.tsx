'use client';

import { cn } from '@/lib/utils';

import { PRICE_SLIDER } from '../data/price-presets';
import styles from './price-slider.module.css';

type PriceSliderProps = {
  /** Current bounds in toman; `undefined` = open end. */
  lo: number | undefined;
  hi: number | undefined;
  onChange: (lo: number | undefined, hi: number | undefined) => void;
};

const { max: MAX, step: STEP } = PRICE_SLIDER;
const clamp = (value: number) => Math.min(MAX, Math.max(0, value));
const percent = (value: number) => (clamp(value) / MAX) * 100;

/** Dual-thumb price slider, RTL (cheap end on the right like the min field). The ends map back to "no bound" so the extremes don't filter. */
export function PriceSlider({ lo, hi, onChange }: PriceSliderProps) {
  const low = clamp(lo ?? 0);
  const high = clamp(hi ?? MAX);

  const setLow = (next: number) => {
    const value = Math.min(next, high - STEP);
    onChange(value <= 0 ? undefined : value, hi);
  };
  const setHigh = (next: number) => {
    const value = Math.max(next, low + STEP);
    onChange(lo, value >= MAX ? undefined : value);
  };

  return (
    <div dir="rtl" className="relative h-6">
      <div className="bg-surface-sunken absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full" />
      <div
        className="from-brand-400 to-brand-600 absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-linear-to-l"
        style={{ right: `${percent(low)}%`, left: `${100 - percent(high)}%` }}
      />
      <input
        type="range"
        min={0}
        max={MAX}
        step={STEP}
        value={low}
        onChange={(event) => setLow(Number(event.target.value))}
        aria-label="حداقل قیمت"
        className={cn(styles.range, low > MAX - STEP * 4 && 'z-10')}
      />
      <input
        type="range"
        min={0}
        max={MAX}
        step={STEP}
        value={high}
        onChange={(event) => setHigh(Number(event.target.value))}
        aria-label="حداکثر قیمت"
        className={styles.range}
      />
    </div>
  );
}
