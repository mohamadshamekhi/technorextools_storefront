'use client';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';

type CartQuantityControlProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

/** Rounded pill stepper for a cart line's quantity. */
export function CartQuantityControl({ quantity, onChange }: CartQuantityControlProps) {
  return (
    <div className="border-hairline bg-surface flex items-center overflow-hidden rounded-full border">
      <button
        type="button"
        aria-label="افزودن یکی"
        onClick={() => onChange(quantity + 1)}
        className="hover:bg-brand-50 hover:text-brand-600 grid size-9 place-items-center transition-colors"
      >
        <Icon name="plus" className="size-3.5" />
      </button>
      <span className="font-display w-8 text-center text-sm font-bold" aria-live="polite">
        {toPersianDigits(quantity)}
      </span>
      <button
        type="button"
        aria-label="کم کردن یکی"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="hover:bg-brand-50 hover:text-brand-600 grid size-9 place-items-center text-base transition-colors"
      >
        −
      </button>
    </div>
  );
}
