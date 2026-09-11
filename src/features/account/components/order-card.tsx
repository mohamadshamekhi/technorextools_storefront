import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

import type { Order } from '../types';
import { OrderRow } from './order-row';

/** One row on the full orders list — links out to the order's own detail page. */
export function OrderCard({ order }: { order: Order }) {
  return (
    <Link
      href={routes.dashboard.orderDetail(order.orderNumber)}
      className="border-hairline bg-surface hover:border-brand-500/40 flex items-center gap-3 rounded-2xl border p-4 shadow-sm transition-colors"
    >
      <div className="min-w-0 flex-1">
        <OrderRow order={order} />
      </div>
      <Icon name="chevronEnd" className="text-foreground-muted size-4 shrink-0" />
    </Link>
  );
}
