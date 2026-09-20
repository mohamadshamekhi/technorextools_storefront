'use client';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';

type CardQuantityStepperProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

const buttonClass =
  'text-brand-600 hover:bg-brand-50 grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-1';

/** Inline +/− control shown on a product card once the item is in the cart; − at 1 removes it. */
export function CardQuantityStepper({ quantity, onChange }: CardQuantityStepperProps) {
  return (
    <div className="bg-surface ring-brand-200 flex h-11 items-center gap-0.5 rounded-full p-1 shadow-(--shadow-soft) ring-1">
      <button
        type="button"
        aria-label="افزودن یکی"
        onClick={() => onChange(quantity + 1)}
        className={buttonClass}
      >
        +
      </button>
      <span
        className="font-display w-7 text-center text-[15px] font-bold tabular-nums"
        aria-live="polite"
      >
        {toPersianDigits(quantity)}
      </span>
      <button
        type="button"
        aria-label={quantity === 1 ? 'حذف از سبد' : 'کم کردن یکی'}
        onClick={() => onChange(quantity - 1)}
        className={buttonClass}
      >
        {quantity === 1 ? <Icon name="trash" className="size-4" /> : '−'}
      </button>
    </div>
  );
}
