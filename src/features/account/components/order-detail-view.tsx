import type { ReactNode } from 'react';

import { Icon } from '@/components/atoms';
import type { IconName } from '@/components/atoms/icons/icon-paths';

import type { OrderDetail } from '../types';
import { statusMeta } from '../utils/orders';
import { OrderDetailItems } from './order-detail-items';
import { OrderDetailSummary } from './order-detail-summary';
import { OrderStatusBadge } from './order-status-badge';
import { OrderStatusTimeline } from './order-status-timeline';

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-hairline bg-surface shadow-soft rounded-(--radius-card) border p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-2.5 text-[14.5px] font-black">
        <span className="bg-brand-50 text-brand-600 grid size-8 shrink-0 place-items-center rounded-xl">
          <Icon name={icon} className="size-4" />
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function OrderDetailView({ order }: { order: OrderDetail }) {
  const meta = statusMeta(order);

  return (
    <div>
      <div
        className="shadow-soft mb-6 flex flex-wrap items-center justify-between gap-3 rounded-(--radius-card) border p-5 sm:p-6"
        style={{ backgroundColor: meta.tint, borderColor: 'transparent' }}
      >
        <div className="flex items-center gap-3.5">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/60"
            style={{ color: meta.ink }}
          >
            <Icon name={meta.icon} className="size-5" />
          </span>
          <div>
            <h1
              className="text-lg font-black tracking-tight sm:text-xl"
              style={{ color: meta.ink }}
            >
              سفارش {order.orderNumber}
            </h1>
            <p className="mt-0.5 text-[13px]" style={{ color: meta.ink }}>
              {order.itemCount} کالا
            </p>
          </div>
        </div>
        <OrderStatusBadge meta={meta} onTint />
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <SectionCard icon="pin" title="آدرس تحویل">
            <p className="text-foreground-muted text-[13.5px] leading-loose">
              {order.address.receiverName} — {order.address.province}، {order.address.city}،{' '}
              {order.address.fullAddress}
            </p>
            <p dir="ltr" className="text-foreground-muted mt-1 text-end text-[12.5px]">
              {order.address.receiverMobile}
            </p>
          </SectionCard>

          <SectionCard icon="cart" title="اقلام سفارش">
            <OrderDetailItems items={order.items} />
          </SectionCard>

          <SectionCard icon="clock" title="وضعیت سفارش">
            <OrderStatusTimeline history={order.statusHistory} />
          </SectionCard>
        </div>

        <div className="lg:sticky lg:top-24">
          <OrderDetailSummary order={order} />
        </div>
      </div>
    </div>
  );
}
