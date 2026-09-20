import { toPersianDigits } from '@/lib/persian';

import type { ProductComments } from '../../../types';
import { StarRow } from '../sections/star-row';

/** Score card + 5→1 star distribution bars (computed from the loaded page of reviews). */
export function RatingSummary({ comments }: { comments: ProductComments }) {
  const { items, total, averageRating } = comments;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: items.filter((item) => Math.round(item.rating) === star).length,
  }));

  return (
    <div className="border-hairline bg-surface h-fit rounded-2xl border p-5 shadow-(--shadow-soft)">
      <div className="text-center">
        <p className="font-display text-4xl font-bold tabular-nums">
          {averageRating ? toPersianDigits(averageRating.toFixed(1)) : '—'}
        </p>
        <StarRow rating={averageRating ?? 0} className="mt-2 justify-center" />
        <p className="text-foreground-muted mt-2 text-[13px]">
          از {toPersianDigits(total)} دیدگاه ثبت‌شده
        </p>
      </div>
      <ul className="mt-4 flex flex-col gap-2" aria-label="توزیع امتیازها">
        {counts.map(({ star, count }) => (
          <li key={star} className="flex items-center gap-2 text-xs">
            <span className="w-4 text-center tabular-nums">{toPersianDigits(star)}</span>
            <span className="bg-surface-sunken h-2 flex-1 overflow-hidden rounded-full">
              <span
                className="bg-accent-500 block h-full origin-right rounded-full"
                // Runtime-computed bar length.
                style={{ transform: `scaleX(${items.length ? count / items.length : 0})` }}
              />
            </span>
            <span className="text-foreground-muted w-5 text-end tabular-nums">
              {toPersianDigits(count)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
