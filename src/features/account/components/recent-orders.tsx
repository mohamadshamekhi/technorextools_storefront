import Link from 'next/link';

import { routes } from '@/config/routes';

import type { Order } from '../types';
import { OrderRow } from './order-row';

/** Overview-page block: the three most recent orders + a link to the full list. */
export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <section aria-labelledby="recent-orders-heading">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="recent-orders-heading" className="text-[15px] font-black">
          سفارش‌های اخیر
        </h2>
        <Link href={routes.dashboard.orders} className="text-brand-600 text-[12.5px] font-bold">
          مشاهده همه ←
        </Link>
      </div>
      <div className="flex flex-col gap-2.5">
        {orders.map((order) => (
          <div
            key={order.code}
            className="border-hairline bg-surface rounded-2xl border p-4 shadow-sm"
          >
            <OrderRow order={order} />
          </div>
        ))}
      </div>
    </section>
  );
}
