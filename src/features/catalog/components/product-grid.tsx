import { Reveal } from '@/components/molecules';

import type { ProductCard as ProductCardData } from '../types';
import { CatalogEmptyState } from './catalog-empty-state';
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
  emptyLabel,
}: ProductGridProps) {
  if (products.length === 0) return <CatalogEmptyState body={emptyLabel} />;

  return (
    <div className={className}>
      {products.map((product, index) => (
        <Reveal key={product.id} className="h-full" delayMs={Math.min(index, 7) * 60}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
