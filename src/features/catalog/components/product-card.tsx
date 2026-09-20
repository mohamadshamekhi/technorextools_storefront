import Link from 'next/link';

import { Icon, MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';
import { WishlistButton } from '@/features/account';
import { formatToman } from '@/lib/persian';

import type { ProductCard as ProductCardData } from '../types';
import { cardPurchase } from '../utils/card-variant';
import { AddToCartButton } from './add-to-cart-button';

export function ProductCard({ product }: { product: ProductCardData }) {
  const href = routes.product(product.slug);
  const purchase = cardPurchase(product);

  return (
    <article className="bg-surface group rounded-card relative flex flex-col gap-4 p-3 shadow-(--shadow-soft) ring-1 ring-black/5 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-(--shadow-float) motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="bg-surface-muted relative overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)]">
        <Link href={href} aria-label={product.title} tabIndex={-1} className="block">
          <MediaPlaceholder
            label={product.title}
            src={product.mainImageUrl ?? undefined}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            className="aspect-square p-6 text-[12px] mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <WishlistButton
          productId={product.id}
          title={product.title}
          className="bg-surface absolute inset-e-3 top-3 z-10 rounded-full shadow-(--shadow-soft)"
        />
        {product.isAmazingDeal ? (
          <span className="bg-sale absolute inset-s-3 bottom-3 z-10 flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-extrabold text-white">
            <Icon name="fire" className="size-3.5" />
            شگفت‌انگیز
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-2">
        {product.brand ? (
          <span className="text-foreground-muted text-[11px] font-bold tracking-wider uppercase">
            {product.brand.title}
          </span>
        ) : null}
        <h3 className="min-h-12 text-[15px] leading-relaxed font-extrabold">
          <Link href={href} className="hover:text-brand-600 line-clamp-2 transition-colors">
            {product.title}
          </Link>
        </h3>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 px-2 pb-1">
        <p className="flex items-baseline gap-1.5">
          <span className="font-display text-foreground text-xl font-black tabular-nums">
            {formatToman(purchase.price)}
          </span>
          <span className="text-foreground-muted text-[12px]">تومان</span>
        </p>
        <AddToCartButton
          compact
          id={purchase.id}
          title={product.title}
          price={purchase.price}
          slug={product.slug}
          imageUrl={product.mainImageUrl}
          variant="1"
        />
      </div>
    </article>
  );
}
