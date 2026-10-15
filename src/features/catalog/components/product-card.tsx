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
    <article className="bg-surface group rounded-card ring-hairline relative flex h-full flex-col gap-3 p-3 transition-shadow duration-300 ease-out hover:shadow-(--shadow-lift) ring-1 motion-reduce:transition-none">
      <div className="bg-surface-muted relative overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)]">
        <Link href={href} aria-label={product.title} tabIndex={-1} className="block">
          <MediaPlaceholder
            label={product.title}
            src={product.mainImageUrl ?? undefined}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            className={cn(
              'aspect-square p-8 text-[12px] mix-blend-multiply transition-transform duration-500 group-hover:scale-105',
              outOfStock && 'opacity-45 grayscale',
            )}
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-start justify-between gap-2">
          {product.isAmazingDeal ? (
            <span className="bg-surface text-sale ring-sale/25 pointer-events-auto flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1">
              <Icon name="fire" className="size-3.5" />
              شگفت‌انگیز
            </span>
          ) : (
            <span aria-hidden />
          )}
          <WishlistButton
            productId={product.id}
            title={product.title}
            className="bg-surface pointer-events-auto"
          />
        </div>

        {outOfStock ? (
          <span className="bg-surface/95 ring-hairline absolute inset-s-3 bottom-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1">
            ناموجود
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-1">
        <div className="flex items-center gap-2 text-[11px]">
          {product.brand ? (
            <span className="text-foreground-muted font-bold tracking-wide uppercase">
              {product.brand.title}
            </span>
          ) : null}
          {product.brand && stockQty !== undefined ? (
            <span className="text-hairline" aria-hidden>
              ·
            </span>
          ) : null}
          {stockQty !== undefined ? (
            <span
              className={cn(
                'font-bold',
                stockQty <= 0 ? 'text-foreground-muted' : lowStock ? 'text-sale' : 'text-success',
              )}
            >
              {stockQty <= 0
                ? 'ناموجود'
                : lowStock
                  ? `تنها ${toPersianDigits(stockQty)} عدد باقی مانده`
                  : 'موجود در انبار'}
            </span>
          ) : null}
        </div>

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
