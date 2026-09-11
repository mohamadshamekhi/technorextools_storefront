import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { RetryPaymentButton, type OrderDetail } from '@/features/account';

/** Shown on `/checkout/result` when the gateway sent the customer back but `abzar/api`'s
 * webhook hasn't landed yet — order is still `pending_payment` on an `online` method.
 * Retry is offered as a fallback rather than a hard failure. */
export function PendingConfirmationStep({ order }: { order: OrderDetail }) {
  return (
    <div className="border-hairline bg-surface relative overflow-hidden rounded-3xl border p-12 text-center">
      <div className="relative mx-auto mb-6 size-24">
        <span className="absolute -inset-3.5 rounded-full bg-[oklch(0.75_0.14_75/0.18)] animate-[auth-pulse_1.8s_ease-in-out_infinite]" />
        <span className="relative grid size-24 place-items-center rounded-full bg-[oklch(0.96_0.03_75)] text-[oklch(0.55_0.15_75)]">
          <Icon name="clock" className="size-11" />
        </span>
      </div>

      <h1 className="text-[1.45rem] font-black">در حال بررسی پرداخت شما</h1>
      <p className="text-foreground-muted mt-2.5 mb-7 text-sm" role="status">
        نتیجه پرداخت هنوز از درگاه دریافت نشده. این صفحه را دوباره بارگذاری کنید یا از سبد
        سفارش‌های خود وضعیت را پیگیری کنید.
      </p>

      <div className="bg-surface-sunken mx-auto mb-8 flex max-w-xs items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5">
        <span className="text-foreground-muted text-[13px]">کد پیگیری سفارش</span>
        <span className="font-display text-[16px] font-bold tracking-wide">{order.orderNumber}</span>
      </div>

      <div className="mx-auto flex max-w-xs flex-col items-center gap-3">
        <div className="w-full">
          <RetryPaymentButton orderNumber={order.orderNumber} />
        </div>
        <Link
          href={routes.dashboard.orders}
          className="text-foreground-muted inline-flex items-center gap-2 px-3 py-3.5 text-sm font-bold"
        >
          مشاهده سفارش‌های من
        </Link>
      </div>
    </div>
  );
}
