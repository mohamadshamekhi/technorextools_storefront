'use client';

import { toPersianDigits } from '@/lib/persian';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
};

export function QuantityStepper({ value, onChange, max = 10 }: QuantityStepperProps) {
  return (
    <div className="border-hairline flex items-center overflow-hidden rounded-xl border">
      <button
        type="button"
        aria-label="افزودن یکی"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="bg-surface-sunken text-foreground hover:text-brand-600 h-11 w-9 text-lg transition-colors"
      >
        +
      </button>
      <span className="font-display w-10 text-center text-[15px] font-bold" aria-live="polite">
        {toPersianDigits(value)}
      </span>
      <button
        type="button"
        aria-label="کم کردن یکی"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="bg-surface-sunken text-foreground hover:text-brand-600 h-11 w-9 text-lg transition-colors"
      >
        −
      </button>
    </div>
  );
}
