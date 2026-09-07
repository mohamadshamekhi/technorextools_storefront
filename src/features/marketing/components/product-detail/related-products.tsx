import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

import type { Product } from '../../types';
import { ProductCard } from '../products/product-card';

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="pt-16">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-brand-50 text-brand-600 grid size-9 place-items-center rounded-xl">
            <Icon name="bolt" className="size-4" />
          </span>
          <h2 id="related-heading" className="text-2xl font-black tracking-tight">
            محصولات مشابه
          </h2>
        </div>
        <Link
          href={routes.products}
          className="text-foreground-muted hover:text-brand-600 text-sm font-bold transition-colors"
        >
          مشاهده همه ←
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
