import { toPersianDigits } from '../../utils/persian';
import type { RatingBar as RatingBarData } from '../../types/product-detail';
import { RatingBar } from './rating-bar';
import { StarRow } from './star-row';

type ReviewSummaryProps = {
  rating: number;
  reviews: number;
  bars: RatingBarData[];
};

export function ReviewSummary({ rating, reviews, bars }: ReviewSummaryProps) {
  return (
    <div className="bg-ink h-fit rounded-2xl p-6 text-white">
      <p className="font-display text-accent-400 text-5xl font-bold">
        {toPersianDigits(rating.toFixed(1))}
      </p>
      <StarRow rating={rating} className="mt-2" starClassName="size-4" />
      <p className="mt-2 text-[13px] text-white/60">از {toPersianDigits(reviews)} نظر مشتری</p>
      <div className="mt-5 flex flex-col gap-2">
        {bars.map((bar) => (
          <RatingBar key={bar.stars} bar={bar} />
        ))}
      </div>
    </div>
  );
}
