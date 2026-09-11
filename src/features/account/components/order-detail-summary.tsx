import { formatToman } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { OrderDetail } from '../types';
import { paymentMethodLabel } from '../utils/orders';
import { RetryPaymentButton } from './retry-payment-button';

/** Totals + payment method/status. Retry only for a pending `online` order — `abzar/api`
 * rejects a retry on `cash` outright, so it must never even be offered there. */
export function OrderDetailSummary({ order }: { order: OrderDetail }) {
  const canRetry = order.paymentMethod === 'online' && order.status === 'pending_payment';

  return (
    <div className="border-hairline bg-surface flex flex-col gap-2.5 rounded-2xl border p-5 text-[13.5px]">
      <Row label="جمع کالاها" value={`${formatToman(order.subtotal)} تومان`} />
      {order.discountAmount > 0 ? (
        <Row
          label={order.discountCode ? `تخفیف کد ${order.discountCode}` : 'تخفیف'}
          value={`−${formatToman(order.discountAmount)} تومان`}
          tone="success"
        />
      ) : null}
      <Row
        label="هزینه ارسال"
        value={order.shippingCost === 0 ? 'رایگان' : `${formatToman(order.shippingCost)} تومان`}
      />
      <div className="border-hairline flex items-baseline justify-between border-t pt-3">
        <span className="text-[14.5px] font-bold">مبلغ نهایی</span>
        <span className="font-display text-[18px] font-bold">{formatToman(order.total)} تومان</span>
      </div>

      <div className="border-hairline mt-1 flex flex-col gap-1.5 border-t pt-3">
        <Row label="روش پرداخت" value={paymentMethodLabel(order.paymentMethod)} />
        {order.payment ? (
          <Row
            label="وضعیت پرداخت"
            value={order.payment.status === 'success' ? 'موفق' : 'در انتظار'}
          />
        ) : null}
      </div>

      {canRetry ? (
        <div className="mt-2">
          <RetryPaymentButton orderNumber={order.orderNumber} />
        </div>
      ) : null}
    </div>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone?: 'success' }) {
  return (
    <div
      className={cn(
        'flex justify-between',
        tone === 'success' ? 'text-[oklch(0.5_0.14_155)]' : 'text-foreground-muted',
      )}
    >
      <span>{label}</span>
      <span className={cn(tone && 'font-bold')}>{value}</span>
    </div>
  );
}
