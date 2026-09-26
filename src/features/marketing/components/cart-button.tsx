'use client';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/features/marketing/utils/persian';
import { useUiStore } from '@/store/ui-store';

import { useCartQuantity } from '../hooks/use-cart-quantity';

/** Header cart entry with a live item-count badge. Opens the mini-cart drawer; the drawer itself
 * carries the link through to `/cart`. */
export function CartButton() {
  const quantity = useCartQuantity();
  const setMiniCartOpen = useUiStore((state) => state.setMiniCartOpen);

  return (
    <button
      type="button"
      onClick={() => setMiniCartOpen(true)}
      aria-label="باز کردن سبد خرید"
      data-cart-target
      className="bg-brand-500 shadow-brand-500/30 hover:bg-brand-600 relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-colors"
    >
      <Icon name="cart" className="size-[17px]" />
      <span className="hidden sm:inline">سبد خرید</span>
      {quantity > 0 ? (
        <span
          key={quantity}
          className="animate-badge-pop bg-ink absolute -top-1.5 -left-1.5 grid size-5 place-items-center rounded-full text-[11px] font-bold text-white"
        >
          {toPersianDigits(quantity)}
        </span>
      ) : null}
    </button>
  );
}
