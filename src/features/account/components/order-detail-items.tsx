import { Icon } from '@/components/atoms';
import { formatToman, toPersianDigits } from '@/lib/persian';

import type { OrderDetail } from '../types';

export function OrderDetailItems({ items }: { items: OrderDetail['items'] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div
          key={`${item.sku ?? item.productTitle}-${index}`}
          className="border-hairline bg-surface-muted flex items-center gap-3 rounded-xl border p-3 text-[13.5px]"
        >
          <span className="bg-surface text-brand-500 grid size-10 shrink-0 place-items-center rounded-lg">
            <Icon name="box" className="size-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{item.productTitle}</p>
            <p className="text-foreground-muted mt-0.5 text-[12px]">
              {toPersianDigits(item.qty)} عدد × {formatToman(item.unitPrice)} تومان
            </p>
          </div>
          <p className="font-display shrink-0 font-bold">{formatToman(item.lineTotal)} تومان</p>
        </div>
      ))}
    </div>
  );
}
