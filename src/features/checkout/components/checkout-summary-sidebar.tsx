import { OrderSummaryLines, type CartTotals } from '@/features/cart';
import { Icon } from '@/components/atoms';
import { formatToman, toPersianDigits } from '@/lib/persian';
import type { CartLine } from '@/store/cart-store';

type CheckoutSummarySidebarProps = {
  lines: CartLine[];
  totals: CartTotals;
  /** Applied discount code, for the "تخفیف کد X" line — empty when none is applied. */
  discountCode: string;
};

export function CheckoutSummarySidebar({ lines, totals, discountCode }: CheckoutSummarySidebarProps) {
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

      <OrderSummaryLines totals={totals} couponCode={discountCode} />

      <p className="text-foreground-muted mt-4.5 flex items-center justify-center gap-1.5 text-[11.5px]">
        <Icon name="shield" className="size-3.5" />
        پرداخت امن با گارانتی اصالت کالا
      </p>
    </div>
  );
}
