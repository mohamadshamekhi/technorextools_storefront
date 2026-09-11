import Link from 'next/link';

import { MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman } from '@/lib/persian';

import type { ProductCard as ProductCardData } from '../types';
import { AddToCartButton } from './add-to-cart-button';

export function ProductCard({ product }: { product: ProductCardData }) {
  const href = routes.product(product.slug);

  return (
    <article className="border-hairline bg-surface hover:border-brand-300 relative flex flex-col overflow-hidden rounded-card border shadow-(--shadow-soft) transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-2 hover:shadow-(--shadow-float)">
      {product.isAmazingDeal ? (
        <span className="bg-sale absolute top-3.5 start-3.5 z-10 rounded-full px-3 py-1 text-[12px] font-extrabold text-white shadow-(--shadow-soft)">
          شگفت‌انگیز
        </span>
      ) : null}
      <Link href={href} aria-label={product.title} tabIndex={-1}>
        <MediaPlaceholder
          label="عکس محصول"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
          className="aspect-square text-[12px]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="min-h-[2.75rem] text-[15px] leading-relaxed font-bold">
          <Link href={href} className="hover:text-brand-600 line-clamp-2 transition-colors">
            {product.title}
          </Link>
        </h3>
        {product.brand ? (
          <p className="text-foreground-muted text-[12px]">{product.brand.title}</p>
        ) : null}
        <p className="flex items-baseline gap-1.5">
          <span className="font-display text-gradient-brand text-xl font-black">
            {formatToman(product.basePrice)}
          </span>
          <span className="text-foreground-muted text-[12px]">تومان</span>
        </p>
        <AddToCartButton
          id={product.id}
          title={product.title}
          price={product.basePrice}
          slug={product.slug}
        />
      </div>
    </article>
  );
}
