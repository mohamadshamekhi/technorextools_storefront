import { formatToman } from '@/lib/persian';

import type { CartTotals } from '../types';

type OrderSummaryLinesProps = { totals: CartTotals; couponCode: string };

export function OrderSummaryLines({ totals, couponCode }: OrderSummaryLinesProps) {
  return (
    <div className="border-hairline flex flex-col gap-2.5 border-t pt-4 text-[13.5px]">
      <div className="text-foreground-muted flex justify-between">
        <span>جمع کالاها</span>
        <span>{formatToman(totals.subtotal)} تومان</span>
      </div>

      {totals.discount > 0 ? (
        <div className="flex justify-between text-[oklch(0.5_0.14_155)]">
          <span>تخفیف کد {couponCode}</span>
          <span>−{formatToman(totals.discount)} تومان</span>
        </div>
      ) : null}

      <div className="text-foreground-muted flex justify-between">
        <span>هزینه ارسال</span>
        <span>
          {totals.shippingCost === 0 ? 'رایگان' : `${formatToman(totals.shippingCost)} تومان`}
        </span>
      </div>

      {totals.discount > 0 ? (
        <div className="flex items-center justify-between rounded-lg bg-[oklch(0.97_0.03_150)] px-2.5 py-1.5 text-[12.5px] font-bold text-[oklch(0.45_0.14_155)]">
          <span>شما در این خرید صرفه‌جویی کردید</span>
          <span>{formatToman(totals.discount)} تومان</span>
        </div>
      ) : null}

      <div className="border-hairline flex items-baseline justify-between border-t pt-3">
        <span className="text-[15px] font-bold">مبلغ قابل پرداخت</span>
        <span className="font-display text-[21px] font-bold">
          {formatToman(totals.total)}{' '}
          <span className="text-foreground-muted font-sans text-xs font-medium">تومان</span>
        </span>
      </div>
    </div>
  );
}
