import { MediaPlaceholder } from '@/components/atoms';
import { formatToman, toPersianDigits } from '@/lib/persian';
import type { CartLine } from '@/store/cart-store';

export function ReviewItemRow({ line }: { line: CartLine }) {
  return (
    <div className="bg-surface-sunken flex items-center gap-3.5 rounded-2xl p-3">
      <MediaPlaceholder
        label={line.title}
        src={line.imageUrl ?? undefined}
        sizes="52px"
        className="border-hairline size-13 shrink-0 rounded-xl border text-[9px]"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-bold">{line.title}</p>
        <p className="text-foreground-muted text-xs">تعداد: {toPersianDigits(line.quantity)}</p>
      </div>
      <span className="font-display text-[14px] font-bold whitespace-nowrap">
        {formatToman(line.price * line.quantity)}{' '}
        <span className="text-foreground-muted font-sans text-[11px] font-medium">تومان</span>
      </span>
    </div>
  );
}
