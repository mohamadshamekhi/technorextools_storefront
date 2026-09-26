import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

import type { Order } from '../types';
import { OrderRow } from './order-row';

/** Overview-page block: the three most recent orders + a link to the full list. */
export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <section
      aria-labelledby="recent-orders-heading"
      className="border-hairline bg-surface rounded-2xl border p-5 shadow-(--shadow-soft)"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="recent-orders-heading" className="text-[14.5px] font-black">
          سفارش‌های اخیر
        </h2>
        <Link
          href={routes.dashboard.orders}
          className="text-brand-600 hover:text-brand-700 focus-visible:ring-brand-500 flex items-center gap-1 rounded-lg px-1 py-1 text-[12.5px] font-bold transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          مشاهده همه
          <Icon name="chevronEnd" className="size-3.5" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="border-hairline flex flex-col items-center gap-3 rounded-xl border border-dashed py-10 text-center">
          <span className="bg-surface-sunken text-foreground-muted grid size-12 place-items-center rounded-2xl">
            <Icon name="box" className="size-6" />
          </span>
          <p className="text-foreground-muted text-[13px]">هنوز سفارشی ثبت نکرده‌اید.</p>
          <Link
            href={routes.products}
            className="bg-brand-500 hover:bg-brand-600 focus-visible:ring-brand-500 inline-flex min-h-11 items-center rounded-xl px-5 text-[13px] font-bold text-white transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            شروع خرید
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {orders.map((order) => (
            <li key={order.orderNumber}>
              <Link
                href={routes.dashboard.orderDetail(order.orderNumber)}
                className="border-hairline hover:border-brand-500/40 hover:bg-surface-sunken/60 focus-visible:ring-brand-500 block rounded-xl border p-3.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <OrderRow order={order} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
