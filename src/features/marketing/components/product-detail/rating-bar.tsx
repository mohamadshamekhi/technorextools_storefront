import { toPersianDigits } from '../../utils/persian';
import type { RatingBar as RatingBarData } from '../../types/product-detail';

export function RatingBar({ bar }: { bar: RatingBarData }) {
  return (
    <div className="flex items-center gap-2.5 text-[12px] text-white/70">
      <span className="w-10 shrink-0">{toPersianDigits(bar.stars)} ستاره</span>
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/12">
        <span
          className="bg-accent-400 block h-full rounded-full"
          style={{ width: `${bar.percent}%` }}
        />
      </span>
    </div>
  );
}
