import { Container } from '@/components/atoms';
import { formatToman } from '@/lib/persian';

import type { TrackedOrder } from '../types';
import { ShippingInfo } from './shipping-info';
import { TrackedItems } from './tracked-items';
import { TrackingTimeline } from './tracking-timeline';

/** Full tracked-order panel: status header, timeline, shipping, items. */
export function TrackingResult({ order }: { order: TrackedOrder }) {
  return (
    <section className="pb-20">
      <Container className="grid max-w-3xl gap-6">
        <div className="border-hairline bg-surface rounded-3xl border p-6 sm:p-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-foreground-muted text-xs">کد سفارش</div>
              <div className="font-display text-lg font-black">{order.orderNumber}</div>
            </div>
            <span className="bg-brand-50 text-brand-700 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold">
              <span className="bg-brand-500 size-2 rounded-full" />
              {order.statusLabel}
            </span>
          </div>
          {order.timeline.length > 0 ? <TrackingTimeline steps={order.timeline} /> : null}
          <p className="text-foreground-muted mt-6 text-sm">
            مبلغ سفارش:{' '}
            <span className="text-foreground font-bold">{formatToman(order.total)}</span> تومان
          </p>
        </div>

        <ShippingInfo carrier={order.carrier} trackingNumber={order.trackingNumber} />
        <TrackedItems items={order.items} />
      </Container>
    </section>
  );
}
