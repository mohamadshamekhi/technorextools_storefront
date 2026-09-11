import { formatToman, toPersianDigits } from '@/lib/persian';

import type { OrderDetail } from '../types';

export function OrderDetailItems({ items }: { items: OrderDetail['items'] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div
          key={`${item.sku ?? item.productTitle}-${index}`}
          className="border-hairline flex items-center justify-between gap-3 border-b pb-3 text-[13.5px] last:border-b-0 last:pb-0"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{item.productTitle}</p>
            <p className="text-foreground-muted text-[12px]">
              {toPersianDigits(item.qty)} × {formatToman(item.unitPrice)} تومان
            </p>
          </div>
          <p className="font-display shrink-0 font-bold">{formatToman(item.lineTotal)} تومان</p>
        </div>
      ))}
    </div>
  );
}
