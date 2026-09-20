import { ProductCardSkeleton } from './product-card-skeleton';

type ProductGridSkeletonProps = {
  count?: number;
  className?: string;
};

/** Streaming fallback for `ProductGrid` — matches its column layout so nothing jumps on load. */
export function ProductGridSkeleton({
  count = 4,
  className = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-4',
}: ProductGridSkeletonProps) {
  return (
    <div className={className} role="status" aria-label="در حال بارگذاری محصولات">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
