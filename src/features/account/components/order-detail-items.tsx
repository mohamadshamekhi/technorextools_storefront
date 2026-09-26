import Link from 'next/link';

import { MediaPlaceholder } from '@/components/atoms';
import { orderItemHref } from '@/lib/order-items';
import { formatToman, toPersianDigits } from '@/lib/persian';

import type { OrderDetail } from '../types';

export function OrderDetailItems({ items }: { items: OrderDetail['items'] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const href = orderItemHref(item.kind, item.productSlug);
        const title = <p className="truncate font-bold">{item.productTitle}</p>;

        return (
          <div
            key={`${item.sku ?? item.productTitle}-${index}`}
            className="border-hairline bg-surface-muted flex items-center gap-3 rounded-xl border p-3 text-[13.5px]"
          >
            <MediaPlaceholder
              label={item.productTitle}
              src={item.imageUrl ?? undefined}
              sizes="48px"
              className="border-hairline bg-surface size-12 shrink-0 rounded-lg border text-[9px]"
            />
            <div className="min-w-0 flex-1">
              {href ? (
                <Link href={href} className="hover:text-brand-600 block transition-colors">
                  {title}
                </Link>
              ) : (
                title
              )}
              <p className="text-foreground-muted mt-0.5 text-[12px]">
                {toPersianDigits(item.qty)} عدد × {formatToman(item.unitPrice)} تومان
              </p>
            </div>
            <p className="font-display shrink-0 font-bold">{formatToman(item.lineTotal)} تومان</p>
          </div>
        );
      })}
    </div>
  );
}
