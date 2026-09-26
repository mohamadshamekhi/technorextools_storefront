import Link from 'next/link';

import { MediaPlaceholder } from '@/components/atoms';
import { orderItemHref } from '@/lib/order-items';
import { formatToman, toPersianDigits } from '@/lib/persian';

import type { TrackedItem } from '../types';

/** Read-only line items for the tracked order. */
export function TrackedItems({ items }: { items: TrackedItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="border-hairline bg-surface rounded-3xl border p-6 sm:p-8">
      <h2 className="mb-4 text-sm font-black">اقلام سفارش</h2>
      <ul className="divide-hairline divide-y">
        {items.map((item) => {
          const href = orderItemHref(item.kind, item.productSlug);
          const title = <span className="text-sm font-semibold">{item.productTitle}</span>;

          return (
            <li
              key={`${item.productTitle}-${item.sku ?? ''}`}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <MediaPlaceholder
                label={item.productTitle}
                src={item.imageUrl ?? undefined}
                sizes="48px"
                className="border-hairline size-12 shrink-0 rounded-lg border text-[9px]"
              />
              <div className="min-w-0 flex-1">
                {href ? (
                  <Link href={href} className="hover:text-brand-600 transition-colors">
                    {title}
                  </Link>
                ) : (
                  title
                )}
                <p className="text-foreground-muted mt-0.5 text-[12px]">
                  {toPersianDigits(item.qty)} عدد
                </p>
              </div>
              <span className="text-sm font-bold whitespace-nowrap">
                {formatToman(item.lineTotal)} تومان
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
