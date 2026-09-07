import { Icon } from '@/components/atoms';
import { formatToman } from '@/lib/persian';

import type { Order } from '../types';
import { itemCountLabel, statusMeta } from '../utils/orders';
import { OrderStatusBadge } from './order-status-badge';

/** Compact order summary line (overview page + collapsed order card header). */
export function OrderRow({ order }: { order: Order }) {
  const meta = statusMeta(order);

  return (
    <div className="flex items-center gap-4">
      <span
        className="grid size-11 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: meta.tint, color: meta.ink }}
      >
        <Icon name={meta.icon} className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-bold">سفارش {order.code}</p>
        <p className="text-foreground-muted text-[12px]">
          {itemCountLabel(order)} · {order.date}
        </p>
      </div>
      <OrderStatusBadge meta={meta} />
      <p className="font-display hidden text-[14px] font-bold whitespace-nowrap sm:block">
        {formatToman(order.total)}{' '}
        <span className="font-sans text-foreground-muted text-[11px] font-medium">تومان</span>
      </p>
    </div>
  );
}
