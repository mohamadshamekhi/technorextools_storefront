'use client';

import { useMemo, useState } from 'react';

import { Icon } from '@/components/atoms';

import type { Order } from '../types';
import { OrderCard } from './order-card';
import { OrderFilterTabs, type OrderFilter } from './order-filter-tabs';

/** Full orders list — owns the status filter + which card is expanded. */
export function OrderList({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState<OrderFilter>('all');

  const visible = useMemo(
    () => (filter === 'all' ? orders : orders.filter((order) => order.status === filter)),
    [orders, filter],
  );

  return (
    <div>
      <OrderFilterTabs value={filter} onChange={setFilter} />
      {visible.length === 0 ? (
        <div className="border-hairline text-foreground-muted flex flex-col items-center gap-3 rounded-2xl border border-dashed py-14 text-center text-sm">
          <Icon name="box" className="size-7" />
          سفارشی با این وضعیت پیدا نشد.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((order) => (
            <OrderCard key={order.orderNumber} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
