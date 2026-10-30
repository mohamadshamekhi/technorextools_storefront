import Link from 'next/link';

import { Icon, MediaPlaceholder } from '@/components/atoms';
import { WishlistButton } from '@/features/account';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { ProductCard } from '../types';

type ProductCardMediaProps = {
  product: ProductCard;
  href: string;
  percentOff: number | null;
  outOfStock: boolean;
};

/** Image stage of a product card: badges, wishlist, sold-out veil, hover "view" bar. */
export function ProductCardMedia({ product, href, percentOff, outOfStock }: ProductCardMediaProps) {
  return (
    <div className="from-surface-muted to-surface-sunken/70 relative overflow-hidden rounded-[calc(var(--radius-card)-0.375rem)] bg-linear-to-b">
      <span
        aria-hidden
        className="bg-surface/80 pointer-events-none absolute inset-x-8 top-1/2 aspect-square -translate-y-1/2 rounded-full blur-2xl"
      />
      <Link href={href} aria-label={product.title} tabIndex={-1} className="relative block">
        <MediaPlaceholder
          label={product.title}
          src={product.mainImageUrl ?? undefined}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
          className={cn(
            'aspect-square p-7 text-[12px] mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.07] group-hover:-rotate-2 motion-reduce:transition-none',
            outOfStock && 'opacity-40 grayscale',
          )}
        />
      </Link>

      <div className="pointer-events-none absolute inset-x-2.5 top-2.5 z-10 flex items-start justify-between gap-2">
        <div className="flex flex-col items-start gap-1.5">
          {percentOff ? (
            <span className="bg-sale rounded-lg px-2 py-1 text-[12px] font-black text-white tabular-nums shadow-sm">
              ٪{toPersianDigits(percentOff)}
            </span>
          ) : null}
          {product.isAmazingDeal ? (
            <span className="from-sale to-accent-600 flex items-center gap-1 rounded-lg bg-linear-to-l px-2 py-1 text-[11px] font-black text-white shadow-(--shadow-accent)">
              <Icon name="fire" className="size-3.5" />
              شگفت‌انگیز
            </span>
          ) : null}
        </div>
        <WishlistButton
          productId={product.id}
          title={product.title}
          className="bg-surface/90 pointer-events-auto shadow-(--shadow-soft) backdrop-blur transition-transform hover:scale-110"
        />
      </div>

      {outOfStock ? (
        <span className="bg-ink/80 absolute inset-x-0 top-1/2 mx-auto w-fit -translate-y-1/2 rounded-full px-4 py-1.5 text-[12px] font-bold text-white backdrop-blur">
          ناموجود
        </span>
      ) : null}

      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="bg-ink/85 absolute inset-x-2.5 bottom-2.5 hidden translate-y-[calc(100%+0.75rem)] items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12.5px] font-bold text-white backdrop-blur transition-transform duration-300 ease-out group-hover:translate-y-0 motion-reduce:transition-none lg:flex"
      >
        مشاهده‌ی جزئیات
        <Icon name="arrowStart" className="size-3.5" />
      </Link>
    </div>
  );
}
