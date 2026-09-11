import Link from 'next/link';

import { MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman } from '@/lib/persian';

import type { ProductCard as ProductCardData } from '../types';
import { AddToCartButton } from './add-to-cart-button';

export function ProductCard({ product }: { product: ProductCardData }) {
  const href = routes.product(product.slug);

  return (
    <article className="border-hairline bg-surface hover:border-brand-300 group relative flex flex-col overflow-hidden rounded-card border shadow-(--shadow-soft) transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-(--shadow-float)">
      {product.isAmazingDeal ? (
        <span className="bg-sale absolute top-3.5 start-3.5 z-10 rounded-full px-3 py-1 text-[12px] font-extrabold text-white shadow-(--shadow-soft)">
          شگفت‌انگیز
        </span>
      ) : null}
      <Link href={href} aria-label={product.title} tabIndex={-1} className="border-hairline border-b">
        <MediaPlaceholder
          label={product.title}
          src={product.mainImageUrl ?? undefined}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
          className="aspect-square bg-surface-muted text-[12px] transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {product.brand ? (
          <span className="text-brand-600 bg-brand-50 w-fit rounded-full px-2.5 py-1 text-[11px] font-bold">
            {product.brand.title}
          </span>
        ) : null}
        <h3 className="min-h-11 text-[15px] leading-relaxed font-bold">
          <Link href={href} className="hover:text-brand-600 line-clamp-2 transition-colors">
            {product.title}
          </Link>
        </h3>
        <div className="border-hairline mt-auto flex flex-col gap-3 border-t pt-3.5">
          <p className="flex items-baseline gap-1.5">
            <span className="font-display text-gradient-brand text-xl font-black tabular-nums">
              {formatToman(product.basePrice)}
            </span>
            <span className="text-foreground-muted text-[12px]">تومان</span>
          </p>
          <AddToCartButton
            id={product.id}
            title={product.title}
            price={product.basePrice}
            slug={product.slug}
            imageUrl={product.mainImageUrl}
          />
        </div>
      </div>
    </article>
  );
}
