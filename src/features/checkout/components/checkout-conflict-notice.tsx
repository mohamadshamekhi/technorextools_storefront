'use client';

import Link from 'next/link';

import { Icon, Spinner } from '@/components/atoms';
import { routes } from '@/config/routes';
import { useRetryPayment } from '@/features/account';
import { formatToman, toPersianDigits } from '@/lib/persian';

import type { CheckoutConflict, CheckoutInFlight } from '../services/checkout.schemas';

type CheckoutConflictNoticeProps = {
  conflict: CheckoutConflict;
  order: CheckoutInFlight['order'];
  /** `abzar/api` reported the lock cleared — the customer can confirm again. */
  resolved: boolean;
};

function minutesLeft(expiresAt: string): number {
  return Math.max(0, Math.round((new Date(expiresAt).getTime() - Date.now()) / 60_000));
}

/** Explains a checkout `409`: either wait for the running request, or pay the unpaid order. */
export function CheckoutConflictNotice({ conflict, order, resolved }: CheckoutConflictNoticeProps) {
  const orderNumber = order?.orderNumber ?? conflict.orderNumber;
  const retry = useRetryPayment(orderNumber ?? '');

  if (resolved && !order) {
    return (
      <p className="bg-surface-muted text-foreground flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-bold">
        <Icon name="check" className="text-success size-4" />
        پردازش تمام شد، می‌توانید دوباره سفارش را ثبت کنید.
      </p>
    );
  }

  if (!order) {
    return (
      <p className="text-brand-700 bg-brand-50 flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-bold">
        <Spinner className="size-4" />
        سفارش شما در حال پردازش است، لطفاً چند لحظه صبر کنید…
      </p>
    );
  }

  return (
    <div className="border-hairline bg-surface-muted flex flex-col gap-3 rounded-2xl border p-4">
      <p className="flex items-center gap-2 text-[13.5px] font-bold">
        <Icon name="alert" className="text-accent-600 size-4" />
        {conflict.code === 'pending_order_exists'
          ? 'یک سفارش پرداخت‌نشده دارید'
          : 'سفارش شما ثبت شد و منتظر پرداخت است'}
      </p>
      <p className="text-foreground-muted text-[13px] leading-6">
        سفارش <bdi className="font-display text-foreground font-bold">{order.orderNumber}</bdi> به
        مبلغ <strong className="text-foreground tabular-nums">{formatToman(order.total)}</strong>{' '}
        تومان. تا {toPersianDigits(minutesLeft(order.expiresAt))} دقیقه‌ی دیگر مهلت پرداخت دارید؛ تا
        آن زمان نمی‌توانید سفارش جدیدی ثبت کنید.
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {order.paymentMethod === 'online' ? (
          <button
            type="button"
            onClick={() => retry.mutate()}
            disabled={retry.isPending || !orderNumber}
            className="bg-accent-500 text-ink hover:bg-accent-400 focus-visible:ring-brand-500 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-extrabold transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60"
          >
            {retry.isPending ? (
              <Spinner className="size-4" />
            ) : (
              <Icon name="card" className="size-4" />
            )}
            پرداخت همین سفارش
          </button>
        ) : null}
        <Link
          href={routes.dashboard.orderDetail(order.orderNumber)}
          className="text-brand-600 inline-flex min-h-11 items-center text-sm font-semibold hover:underline"
        >
          مشاهده جزئیات سفارش
        </Link>
      </div>
      {retry.isError ? (
        <p className="text-sale text-[13px] font-bold">باز کردن درگاه پرداخت ناموفق بود.</p>
      ) : null}
    </div>
  );
}
