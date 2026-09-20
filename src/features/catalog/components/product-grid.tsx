import { Icon } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import type { ProductCard as ProductCardData } from '../types';
import { ProductCard } from './product-card';

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

  return (
    <div className={className}>
      {products.map((product, index) => (
        <Reveal key={product.id} delayMs={index * 60}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
