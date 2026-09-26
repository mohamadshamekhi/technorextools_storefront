import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

/** Gateway sent us back with an order number `abzar/api` won't return for this user (deleted,
 * not theirs, or upstream down). Never claim a payment state we couldn't verify. */
export function CheckoutResultMissing({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="border-hairline bg-surface rounded-3xl border p-12 text-center">
      <span className="bg-surface-sunken text-foreground-muted mx-auto mb-6 grid size-20 place-items-center rounded-full">
        <Icon name="question" className="size-9" />
      </span>

      <h1 className="text-[1.45rem] font-black">وضعیت سفارش قابل تأیید نبود</h1>
      <p className="text-foreground-muted mx-auto mt-2.5 mb-7 max-w-sm text-sm leading-7">
        نتوانستیم این سفارش را بخوانیم. اگر مبلغی از حساب شما کسر شده، در سفارش‌های شما ثبت است؛
        در غیر این صورت تا چند دقیقه دیگر به حساب شما برمی‌گردد.
      </p>

      <div className="bg-surface-sunken mx-auto mb-8 flex max-w-xs items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5">
        <span className="text-foreground-muted text-[13px]">کد پیگیری سفارش</span>
        <span className="font-display text-[16px] font-bold tracking-wide">{orderNumber}</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={routes.orderTracking}
          className="bg-brand-500 hover:bg-brand-600 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-colors"
        >
          پیگیری سفارش
        </Link>
        <Link
          href={routes.dashboard.orders}
          className="border-hairline inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold"
        >
          سفارش‌های من
        </Link>
      </div>
    </div>
  );
}
