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
    <div className="border-hairline bg-surface shadow-soft flex flex-col gap-2.5 rounded-(--radius-card) border p-5 text-[13.5px] sm:p-6">
      <h2 className="mb-1 text-[14.5px] font-black">خلاصه پرداخت</h2>
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

      <div className="bg-brand-50 mt-1 flex items-baseline justify-between rounded-xl px-3.5 py-3">
        <span className="text-brand-700 text-[14.5px] font-bold">مبلغ نهایی</span>
        <span className="font-display text-brand-700 text-[19px] font-bold">
          {formatToman(order.total)} تومان
        </span>
      </div>

      <div className="border-hairline mt-1 flex flex-col gap-1.5 border-t pt-3">
        <Row label="روش پرداخت" value={paymentMethodLabel(order.paymentMethod)} />
        {order.payment ? (
          <Row
            label="وضعیت پرداخت"
            value={order.payment.status === 'success' ? 'موفق' : 'در انتظار'}
            tone={order.payment.status === 'success' ? 'success' : undefined}
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
        tone === 'success' ? 'text-success' : 'text-foreground-muted',
      )}
    >
      <span>{label}</span>
      <span className={cn(tone && 'font-bold')}>{value}</span>
    </div>
  );
}
