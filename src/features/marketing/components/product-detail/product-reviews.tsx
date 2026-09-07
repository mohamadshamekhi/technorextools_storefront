import type { ProductReview, RatingBar as RatingBarData } from '../../types/product-detail';
import { ReviewCard } from './review-card';
import { ReviewSummary } from './review-summary';

type ProductReviewsProps = {
  rating: number;
  reviewCount: number;
  bars: RatingBarData[];
  reviews: ProductReview[];
};

export function ProductReviews({ rating, reviewCount, bars, reviews }: ProductReviewsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <ReviewSummary rating={rating} reviews={reviewCount} bars={bars} />
      <div className="flex flex-col gap-4">
        {reviews.map((review, index) => (
          <ReviewCard key={review.name} review={review} index={index} />
        ))}
      </div>
    </div>
  );
}
