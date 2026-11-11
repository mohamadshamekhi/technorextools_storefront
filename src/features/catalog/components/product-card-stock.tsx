import type { CardStock } from '../utils/card-variant';
import { CALL_TO_ORDER_MESSAGE } from './call-to-order';

/** Stock line under the title: either orderable online or needs a call — never shows a bare count. */
export function ProductCardStock({ stock }: { stock: CardStock }) {
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
