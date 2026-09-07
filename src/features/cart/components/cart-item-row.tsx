'use client';

import { Icon, MediaPlaceholder } from '@/components/atoms';
import { discountPercent, formatToman, toPersianDigits } from '@/lib/persian';
import type { CartLine } from '@/store/cart-store';

import { CartQuantityControl } from './cart-quantity-control';
import { ProductMediaBadge } from './product-media-badge';

type CartItemRowProps = {
  line: CartLine;
  categorySlug: string | undefined;
  onChangeQuantity: (quantity: number) => void;
  onRemove: () => void;
};

export function CartItemRow({ line, categorySlug, onChangeQuantity, onRemove }: CartItemRowProps) {
  const onSale = typeof line.compareAt === 'number' && line.compareAt > line.price;

  return (
    <div className="border-hairline bg-surface hover:border-brand-500/40 grid grid-cols-[72px_1fr] items-start gap-3.5 rounded-2xl border p-4 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[96px_1fr_auto] sm:items-center sm:gap-4.5 sm:p-4.5">
      <div className="relative">
        <MediaPlaceholder label="عکس محصول" className="aspect-square rounded-xl text-[10px]" />
        <ProductMediaBadge categorySlug={categorySlug} />
      </div>

      <div className="min-w-0">
        <p className="mb-1.5 text-[15px] leading-relaxed font-bold">{line.title}</p>
        {line.variant ? (
          <span className="bg-surface-sunken text-foreground-muted mb-2 inline-block rounded-full px-2.5 py-0.5 text-[12px] font-medium">
            {line.variant}
          </span>
        ) : null}
        {onSale ? (
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-sale rounded-full px-2 py-0.5 text-[11px] font-extrabold text-white">
              {toPersianDigits(discountPercent(line.price, line.compareAt as number))}٪
            </span>
            <span className="text-foreground-muted text-[12px] line-through">
              {formatToman(line.compareAt as number)} تومان
            </span>
          </div>
        ) : null}
        <div className="mt-1 flex flex-wrap items-center gap-3.5">
          <CartQuantityControl quantity={line.quantity} onChange={onChangeQuantity} />
          <button
            type="button"
            onClick={onRemove}
            className="text-foreground-muted hover:text-sale flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors"
          >
            <Icon name="trash" className="size-3.5" />
            حذف
          </button>
        </div>
      </div>

      <p className="font-display col-span-2 text-[17px] font-bold sm:col-span-1 sm:text-start">
        {formatToman(line.price * line.quantity)}{' '}
        <span className="font-sans text-foreground-muted text-[11px] font-medium">تومان</span>
      </p>
    </div>
  );
}
