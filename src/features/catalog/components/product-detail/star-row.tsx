import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

type StarRowProps = {
  rating: number;
  className?: string;
  starClassName?: string;
};

/** Five stars, filled up to `rating` (rounded). */
export function StarRow({ rating, className, starClassName = 'size-3.5' }: StarRowProps) {
  const filled = Math.round(rating);
  return (
    <span className={cn('flex items-center gap-0.5', className)} aria-label={`${rating} از ۵`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Icon
          key={index}
          name="star"
          className={cn(starClassName, index <= filled ? 'text-accent-500 fill-current' : 'text-hairline')}
        />
      ))}
    </span>
  );
}
