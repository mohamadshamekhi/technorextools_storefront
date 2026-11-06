import { toPersianDigits } from '@/lib/persian';

import { LOW_STOCK, type CardStock } from '../utils/card-variant';
import { CALL_TO_ORDER_MESSAGE } from './call-to-order';

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

  if (stock.state === 'call') {
    return (
      <p className="text-brand-700 text-[12px] leading-5 font-bold">{CALL_TO_ORDER_MESSAGE}</p>
    );
  }

  return (
    <p className="text-success flex items-center gap-1.5 text-[11.5px] font-semibold">
      <span className="relative flex size-2">
        <span className="bg-success absolute inset-0 animate-ping rounded-full opacity-50 motion-reduce:hidden" />
        <span className="bg-success relative size-2 rounded-full" />
      </span>
      موجود در انبار، ارسال فوری
    </p>
  );
}
