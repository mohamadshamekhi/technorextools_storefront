import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { LOW_STOCK, type CardStock } from '../utils/card-variant';

/** Stock line under the title; low stock gets an urgency bar. */
export function ProductCardStock({ stock }: { stock: CardStock }) {
  if (stock.state === 'low' && stock.qty !== undefined) {
    return (
      <div className="flex flex-col gap-1.5">
        <p className="text-sale text-[11.5px] font-bold">
          فقط {toPersianDigits(stock.qty)} عدد در انبار باقی مانده
        </p>
        <div className="bg-sale/10 h-1.5 overflow-hidden rounded-full">
          <div
            className="from-sale to-accent-500 h-full rounded-full bg-linear-to-l"
            style={{ width: `${(stock.qty / (LOW_STOCK + 1)) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  const inStock = stock.state === 'in';
  return (
    <p
      className={cn(
        'flex items-center gap-1.5 text-[11.5px] font-semibold',
        inStock ? 'text-success' : 'text-foreground-muted',
      )}
    >
      <span className="relative flex size-2">
        {inStock ? (
          <span className="bg-success absolute inset-0 animate-ping rounded-full opacity-50 motion-reduce:hidden" />
        ) : null}
        <span
          className={cn(
            'relative size-2 rounded-full',
            inStock ? 'bg-success' : 'bg-foreground-muted',
          )}
        />
      </span>
      {inStock ? 'موجود در انبار، ارسال فوری' : 'فعلاً موجود نیست'}
    </p>
  );
}
