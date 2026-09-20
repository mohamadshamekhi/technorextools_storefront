import { formatJalaliDate } from '@/features/content/utils/date';

import type { ProductComment } from '../../../types';
import { StarRow } from '../sections/star-row';

export function ReviewCard({ review }: { review: ProductComment }) {
  return (
    <article className="border-hairline bg-surface rounded-2xl border p-5">
      <header className="mb-2.5 flex items-center gap-3">
        <span className="bg-surface-sunken text-foreground grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold">
          {(review.authorName ?? 'م').slice(0, 1)}
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">{review.authorName ?? 'کاربر تکنورکس'}</p>
          <p className="text-foreground-muted text-xs">{formatJalaliDate(review.createdAt)}</p>
        </div>
        <StarRow rating={review.rating} starClassName="size-3.5" />
      </header>
      <p className="text-foreground text-sm leading-7">{review.body}</p>
    </article>
  );
}
