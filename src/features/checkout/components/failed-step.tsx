import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { RetryPaymentButton, type OrderDetail } from '@/features/account';

/** Shown on `/checkout/result` for an order the gateway didn't settle
 * (`payment_failed` / `abandoned` / `cancelled`). Stock was released by `abzar/api`;
 * retry re-opens a fresh payment session. */
export function FailedStep({ order }: { order: OrderDetail }) {
  return (
    <div className="border-hairline bg-surface relative overflow-hidden rounded-3xl border p-12 text-center">
      <div className="relative mx-auto mb-6 size-24">
        <span className="absolute -inset-3.5 rounded-full bg-[oklch(0.55_0.2_25/0.15)]" />
        <span className="relative grid size-24 place-items-center rounded-full bg-[oklch(0.94_0.05_25)] text-[oklch(0.55_0.2_25)]">
          <Icon name="alert" className="size-11" />
        </span>
      </div>

      <h1 className="text-[1.45rem] font-black">پرداخت شما ناموفق بود</h1>
      <p className="text-foreground-muted mt-2.5 mb-7 text-sm" role="alert">
        مبلغ سفارش کسر نشد. می‌توانید دوباره تلاش کنید یا با روش دیگری پرداخت را انجام دهید.
      </p>

      <div className="bg-surface-sunken mx-auto mb-8 flex max-w-xs items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5">
        <span className="text-foreground-muted text-[13px]">کد پیگیری سفارش</span>
        <span className="font-display text-[16px] font-bold tracking-wide">{order.orderNumber}</span>
      </div>

      <div className="mx-auto flex max-w-xs flex-col items-center gap-3">
        {order.paymentMethod === 'online' ? (
          <div className="w-full">
            <RetryPaymentButton orderNumber={order.orderNumber} />
          </div>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={routes.cart}
            className="border-hairline inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold"
          >
            بازگشت به سبد خرید
          </Link>
          <Link
            href={routes.dashboard.orders}
            className="text-foreground-muted inline-flex items-center gap-2 px-3 py-3.5 text-sm font-bold"
          >
            مشاهده سفارش‌های من
          </Link>
        </div>
      </div>
    </div>
  );
}
