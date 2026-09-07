import { Icon } from '@/components/atoms';

import { toPersianDigits } from '../../utils/persian';

type RatingStarsProps = {
  rating: number;
  reviews: number;
};

export function RatingStars({ rating, reviews }: RatingStarsProps) {
  return (
    <p className="flex items-center gap-1.5 text-[13px]">
      <Icon name="star" className="text-accent-500 size-3.5 fill-current" title="امتیاز" />
      <span className="font-bold">{toPersianDigits(rating.toFixed(1))}</span>
      <span className="text-foreground-muted">({toPersianDigits(reviews)} نظر)</span>
    </p>
  );
}
