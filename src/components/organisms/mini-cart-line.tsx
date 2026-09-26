'use client';

import { MediaPlaceholder } from '@/components/atoms';
import { formatToman, toPersianDigits } from '@/lib/persian';
import type { CartLine } from '@/store/cart-store';

/** One row inside the mini-cart drawer — read-only; editing happens on the cart page. */
export function MiniCartLine({ line }: { line: CartLine }) {
  return (
    <li className="flex items-start gap-3 py-3.5">
      <MediaPlaceholder
        label={line.title}
        src={line.imageUrl ?? undefined}
        className="border-hairline size-16 shrink-0 rounded-xl border text-[9px]"
      />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[13px] leading-6 font-bold">{line.title}</p>
        {line.variant ? (
          <span className="bg-surface-sunken text-foreground-muted mt-1 inline-block rounded-full px-2 py-0.5 text-[11px]">
            {line.variant}
          </span>
        ) : null}
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="border-hairline text-foreground-muted rounded-md border px-1.5 py-0.5 text-[11px] tabular-nums">
            {toPersianDigits(line.quantity)} عدد
          </span>
          <span className="text-[12.5px] font-bold tabular-nums">
            {formatToman(line.price * line.quantity)}{' '}
            <span className="text-foreground-muted font-normal">تومان</span>
          </span>
        </div>
      </div>
    </li>
  );
}
