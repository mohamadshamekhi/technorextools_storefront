import { Icon } from '@/components/atoms';
import { formatToman, toPersianDigits } from '@/lib/persian';
import type { CartLine } from '@/store/cart-store';

export function CheckoutSummarySidebar({ lines, total }: { lines: CartLine[]; total: number }) {
  return (
    <div className="border-hairline bg-surface rounded-card sticky top-22 min-w-0 border p-6">
      <p className="mb-4.5 text-[15px] font-black">خلاصه سفارش</p>

      <div className="mb-4 flex flex-col gap-2.5">
        {lines.map((line) => (
          <div key={line.id} className="text-foreground-muted flex justify-between text-[13px]">
            <span className="min-w-0 flex-1 truncate">
              {line.title} × {toPersianDigits(line.quantity)}
            </span>
            <span className="shrink-0 ps-2">{formatToman(line.price * line.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-hairline flex flex-col gap-2.5 border-t pt-3.5 text-[13.5px]">
        <div className="text-foreground-muted flex justify-between">
          <span>هزینه ارسال</span>
          <span>رایگان</span>
        </div>
        <div className="border-hairline flex items-baseline justify-between border-t pt-2.5">
          <span className="text-[14.5px] font-bold">مبلغ نهایی</span>
          <span className="font-display text-[19px] font-bold">
            {formatToman(total)}{' '}
            <span className="font-sans text-foreground-muted text-[11px] font-medium">تومان</span>
          </span>
        </div>
      </div>

      <p className="text-foreground-muted mt-4.5 flex items-center justify-center gap-1.5 text-[11.5px]">
        <Icon name="shield" className="size-3.5" />
        پرداخت امن با گارانتی اصالت کالا
      </p>
    </div>
  );
}
