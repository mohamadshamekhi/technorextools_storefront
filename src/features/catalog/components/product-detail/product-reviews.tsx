import { toPersianDigits } from '@/lib/persian';
import { formatJalaliDate } from '@/features/content/utils/date';

import type { ProductComments } from '../../types';
import { StarRow } from './star-row';

export function ProductReviews({ comments }: { comments: ProductComments }) {
  const { items, total, averageRating } = comments;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <div className="border-hairline bg-surface h-fit rounded-2xl border p-5 text-center">
        <p className="font-display text-4xl font-black">
          {averageRating ? toPersianDigits(averageRating.toFixed(1)) : '—'}
        </p>
        <StarRow rating={averageRating ?? 0} className="mt-2 justify-center" />
        <p className="text-foreground-muted mt-2 text-[13px]">
          از {toPersianDigits(total)} نظر ثبت‌شده
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {items.length === 0 ? (
          <p className="text-foreground-muted text-sm">هنوز نظری برای این محصول ثبت نشده است.</p>
        ) : (
          items.map((review) => (
            <article key={review.id} className="border-hairline bg-surface rounded-2xl border p-5">
              <header className="mb-2.5 flex items-center gap-3">
                <span className="bg-brand-500 grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white">
                  {(review.authorName ?? 'م').slice(0, 1)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold">{review.authorName ?? 'کاربر پوما ایر'}</p>
                  <p className="text-foreground-muted text-[11px]">
                    {formatJalaliDate(review.createdAt)}
                  </p>
                </div>
                <StarRow rating={review.rating} starClassName="size-3" />
              </header>
              <p className="text-foreground-muted text-[13.5px] leading-relaxed">{review.body}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
