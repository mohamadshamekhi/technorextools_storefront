'use client';

import { Icon, Spinner } from '@/components/atoms';

import { useRetryPayment } from '../hooks/use-retry-payment';

/** Re-opens a payment session for a pending `online` order. Never rendered for `cash`
 * orders — `abzar/api` itself rejects a retry there with 400. */
export function RetryPaymentButton({ orderNumber }: { orderNumber: string }) {
  const retry = useRetryPayment(orderNumber);

  return (
    <div>
      <button
        type="button"
        onClick={() => retry.mutate()}
        disabled={retry.isPending}
        className="bg-brand-500 hover:bg-brand-600 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-extrabold text-white transition-colors disabled:pointer-events-none disabled:opacity-70"
      >
        {retry.isPending ? <Spinner className="size-4" /> : <Icon name="card" className="size-4" />}
        {retry.isPending ? 'در حال اتصال به درگاه…' : 'پرداخت مجدد'}
      </button>
      {retry.error ? (
        <p className="text-sale mt-2 text-[12.5px]">
          {retry.error instanceof Error ? retry.error.message : 'باز کردن درگاه پرداخت ناموفق بود'}
        </p>
      ) : null}
    </div>
  );
}
