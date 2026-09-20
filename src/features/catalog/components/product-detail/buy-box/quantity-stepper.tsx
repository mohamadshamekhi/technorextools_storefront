'use client';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
};

const stepButton =
  'grid size-11 place-items-center text-foreground transition-[transform,color] duration-150 active:scale-[0.96] enabled:hover:text-brand-600 disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none focus-visible:ring-inset';

export function QuantityStepper({ value, onChange, max = 10 }: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label="تعداد"
      className="border-hairline bg-surface flex h-12 items-center overflow-hidden rounded-xl border"
    >
      <button
        type="button"
        aria-label="افزایش تعداد"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={stepButton}
      >
        <Icon name="plus" className="size-4" />
      </button>
      <span className="grid h-full w-10 place-items-center overflow-hidden" aria-live="polite">
        <span
          key={value}
          className="animate-digit-in font-display text-base font-bold tabular-nums"
        >
          {toPersianDigits(value)}
        </span>
      </span>
      <button
        type="button"
        aria-label="کاهش تعداد"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        className={stepButton}
      >
        <span aria-hidden className="h-0.5 w-3.5 rounded bg-current" />
      </button>
    </div>
  );
}
