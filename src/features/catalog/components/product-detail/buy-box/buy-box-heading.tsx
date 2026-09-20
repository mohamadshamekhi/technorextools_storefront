import type { ReactNode } from 'react';

import { toPersianDigits } from '@/lib/persian';

import type { ProductComments, ProductDetail } from '../../../types';
import { StarRow } from '../sections/star-row';

type BuyBoxHeadingProps = {
  product: ProductDetail;
  sku: string;
  comments: ProductComments;
  /** Trailing control beside the SKU (wishlist). */
  action?: ReactNode;
};

export function BuyBoxHeading({ product, sku, comments, action }: BuyBoxHeadingProps) {
  const rating = comments.averageRating ?? 0;

  return (
    <header>
      <div className="text-foreground-muted flex flex-wrap items-center justify-between gap-2 text-[13px]">
        {product.brand ? (
          <span className="bg-surface-muted text-foreground rounded-full px-3 py-1 font-bold">
            {product.brand.title}
          </span>
        ) : (
          <span />
        )}
        <span className="flex items-center gap-2">
          <span>
            کد کالا: <bdi className="font-display text-foreground font-semibold">{sku}</bdi>
          </span>
          {action}
        </span>
      </div>

      <h1 className="mt-3 text-[26px] leading-[1.5] font-bold tracking-tight">{product.title}</h1>

      <a
        href="#reviews"
        className="text-foreground-muted hover:text-brand-600 focus-visible:ring-brand-500 mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg text-[13px] focus-visible:ring-2 focus-visible:outline-none"
      >
        <StarRow rating={rating} />
        <span>
          {comments.total > 0
            ? `${toPersianDigits(comments.total)} دیدگاه`
            : 'اولین دیدگاه را ثبت کنید'}
        </span>
      </a>
    </header>
  );
}
