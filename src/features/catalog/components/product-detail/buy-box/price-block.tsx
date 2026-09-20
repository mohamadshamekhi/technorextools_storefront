'use client';

import { useTweenedNumber } from '../../../hooks/use-tweened-number';
import { discountPercent, formatToman, toPersianDigits } from '@/lib/persian';

type PriceBlockProps = {
  unitPrice: number;
  quantity: number;
  oldPrice?: number | null;
};

export function PriceBlock({ unitPrice, quantity, oldPrice }: PriceBlockProps) {
  const total = useTweenedNumber(unitPrice * quantity);
  const hasDiscount = oldPrice != null && oldPrice > unitPrice;

  return (
    <div>
      {hasDiscount ? (
        <p className="mb-1 flex items-center gap-2">
          <span className="bg-accent-500 text-ink rounded-full px-2.5 py-0.5 text-[13px] font-extrabold">
            {toPersianDigits(discountPercent(unitPrice, oldPrice))}٪ تخفیف
          </span>
          <del className="text-foreground-muted text-[15px] tabular-nums">
            {formatToman(oldPrice)}
          </del>
        </p>
      ) : null}
      <p className="flex items-baseline gap-2">
        <span className="font-display text-[36px] leading-tight font-bold tracking-tight tabular-nums">
          {formatToman(unitPrice)}
        </span>
        <span className="text-foreground-muted text-sm">تومان</span>
      </p>
      <p className="text-foreground-muted mt-0.5 text-xs">شامل مالیات بر ارزش افزوده</p>
      {quantity > 1 ? (
        <p className="text-foreground mt-2 text-sm" aria-live="polite">
          جمع {toPersianDigits(quantity)} عدد:{' '}
          <strong className="font-display tabular-nums">{formatToman(total)}</strong> تومان
        </p>
      ) : null}
    </div>
  );
}
