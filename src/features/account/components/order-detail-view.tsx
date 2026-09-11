import { Icon } from '@/components/atoms';

import type { OrderDetail } from '../types';
import { statusMeta } from '../utils/orders';
import { OrderDetailItems } from './order-detail-items';
import { OrderDetailSummary } from './order-detail-summary';
import { OrderStatusBadge } from './order-status-badge';
import { OrderStatusTimeline } from './order-status-timeline';
import { PageHeading } from './page-heading';

export function OrderDetailView({ order }: { order: OrderDetail }) {
  return (
    <div>
      <PageHeading
        title={`سفارش ${order.orderNumber}`}
        subtitle={`${order.itemCount} کالا`}
        action={<OrderStatusBadge meta={statusMeta(order)} />}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <section className="border-hairline bg-surface rounded-2xl border p-5">
            <h2 className="mb-3.5 flex items-center gap-2 text-[14px] font-black">
              <Icon name="pin" className="text-brand-600 size-4" />
              آدرس تحویل
            </h2>
            <p className="text-foreground-muted text-[13.5px] leading-loose">
              {order.address.receiverName} — {order.address.province}، {order.address.city}،{' '}
              {order.address.fullAddress}
            </p>
            <p dir="ltr" className="text-foreground-muted mt-1 text-end text-[12.5px]">
              {order.address.receiverMobile}
            </p>
          </section>

          <section className="border-hairline bg-surface rounded-2xl border p-5">
            <h2 className="mb-3.5 flex items-center gap-2 text-[14px] font-black">
              <Icon name="cart" className="text-brand-600 size-4" />
              اقلام سفارش
            </h2>
            <OrderDetailItems items={order.items} />
          </section>

          <section className="border-hairline bg-surface rounded-2xl border p-5">
            <h2 className="mb-3.5 flex items-center gap-2 text-[14px] font-black">
              <Icon name="clock" className="text-brand-600 size-4" />
              وضعیت سفارش
            </h2>
            <OrderStatusTimeline history={order.statusHistory} />
          </section>
        </div>

        <OrderDetailSummary order={order} />
      </div>
    </div>
  );
}
