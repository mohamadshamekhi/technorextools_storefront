import type { ProductReview } from '../../types/product-detail';
import { StarRow } from './star-row';

const AVATAR_TONES = [
  'bg-brand-500',
  'bg-info',
  'bg-[oklch(0.5_0.14_155)]',
  'bg-accent-500',
] as const;

type ReviewCardProps = {
  review: ProductReview;
  index: number;
};

export function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <article className="border-hairline bg-surface rounded-2xl border p-5">
      <header className="mb-2.5 flex items-center gap-3">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${
            AVATAR_TONES[index % AVATAR_TONES.length]
          }`}
        >
          {review.name.slice(0, 1)}
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">{review.name}</p>
          <p className="text-foreground-muted text-[11px]">{review.date}</p>
        </div>
        <StarRow rating={review.rating} starClassName="size-3" />
      </header>
      <p className="text-foreground-muted text-[13.5px] leading-relaxed">{review.text}</p>
    </article>
  );
}
