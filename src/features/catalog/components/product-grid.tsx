import { Icon } from '@/components/atoms';

import type { ProductCard as ProductCardData } from '../types';
import { ComingSoonCard } from './coming-soon-card';
import { ProductCard } from './product-card';

/** Below this count, filler tiles round the grid out to a full first row. */
const MIN_ROW_SIZE = 3;

type ProductGridProps = {
  products: ProductCardData[];
  /** Tailwind grid-cols classes. */
  className?: string;
  emptyLabel?: string;
};

export function ProductGrid({
  products,
  className = 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3',
  emptyLabel = 'محصولی یافت نشد.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-foreground-muted flex items-center gap-2 py-12 text-sm">
        <Icon name="box" className="size-5" />
        {emptyLabel}
      </p>
    );
  }

  const fillerCount = Math.max(0, MIN_ROW_SIZE - products.length);

  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {Array.from({ length: fillerCount }, (_, index) => (
        <ComingSoonCard key={`filler-${index}`} />
      ))}
    </div>
  );
}
