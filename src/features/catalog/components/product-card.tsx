import Link from 'next/link';

import { Icon, MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';
import { WishlistButton } from '@/features/account';
import { formatToman, toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { ProductCard as ProductCardData } from '../types';
import { cardPurchase } from '../utils/card-variant';
import { AddToCartButton } from './add-to-cart-button';

export function ProductCard({ product }: { product: ProductCardData }) {
  const href = routes.product(product.slug);
  const purchase = cardPurchase(product);
  const stockQty = product.firstVariant?.stockQty;
  const lowStock = stockQty !== undefined && stockQty > 0 && stockQty <= 3;
  const outOfStock = stockQty !== undefined && stockQty <= 0;

  return (
    <article className="bg-surface group rounded-card ring-hairline relative flex h-full flex-col gap-3 p-2.5 ring-1 transition-shadow duration-300 ease-out hover:shadow-(--shadow-lift) motion-reduce:transition-none">
      <div className="bg-surface-muted relative overflow-hidden rounded-[calc(var(--radius-card)-0.375rem)]">
        <Link href={href} aria-label={product.title} tabIndex={-1} className="block">
          <MediaPlaceholder
            label={product.title}
            src={product.mainImageUrl ?? undefined}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            className={cn(
              'aspect-square p-6 text-[12px] mix-blend-multiply transition-transform duration-500 group-hover:scale-105',
              outOfStock && 'opacity-45 grayscale',
            )}
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-2.5 top-2.5 z-10 flex items-start justify-between gap-2">
          <WishlistButton
            productId={product.id}
            title={product.title}
            className="bg-surface/90 pointer-events-auto shadow-(--shadow-soft) backdrop-blur"
          />

          <div className="pointer-events-auto flex flex-col items-end gap-1.5">
            <span
              className={cn(
                'bg-surface/95 ring-hairline flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap shadow-(--shadow-soft) ring-1 backdrop-blur',
                outOfStock ? 'text-foreground-muted' : lowStock ? 'text-sale' : 'text-success',
              )}
            >
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  outOfStock ? 'bg-foreground-muted' : lowStock ? 'bg-sale' : 'bg-success',
                )}
                aria-hidden
              />
              {outOfStock
                ? 'ناموجود'
                : lowStock
                  ? `${toPersianDigits(stockQty)} عدد باقی مانده`
                  : 'موجود'}
            </span>
            {product.isAmazingDeal ? (
              <span className="bg-surface text-sale ring-sale/25 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap ring-1">
                <Icon name="fire" className="size-3.5" />
                شگفت‌انگیز
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-1">
        {product.brand ? (
          <p className="text-foreground-muted text-[11px] font-bold tracking-wide uppercase">
            {product.brand.title}
          </p>
        ) : null}

        <h3 className="min-h-11 text-[14.5px] leading-snug font-bold">
          <Link href={href} className="hover:text-brand-600 line-clamp-2 transition-colors">
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <p className="flex items-baseline gap-1">
            <span className="font-display text-foreground text-lg font-extrabold tabular-nums">
              {formatToman(purchase.price)}
            </span>
            <span className="text-foreground-muted text-[11px]">تومان</span>
          </p>
          <AddToCartButton
            compact
            disabled={outOfStock}
            id={purchase.id}
            title={product.title}
            price={purchase.price}
            slug={product.slug}
            imageUrl={product.mainImageUrl}
            variant="1"
            className="shadow-none"
          />
        </div>
      </div>
    </article>
  );
}
