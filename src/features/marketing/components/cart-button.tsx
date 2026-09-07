'use client';

import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { toPersianDigits } from '@/features/marketing/utils/persian';

import { useCartQuantity } from '../hooks/use-cart-quantity';

/** Header cart entry with a live item-count badge. */
export function CartButton() {
  const quantity = useCartQuantity();

  return (
    <Link
      href={routes.cart}
      className="bg-brand-500 shadow-brand-500/30 hover:bg-brand-600 relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-colors"
    >
      <Icon name="cart" className="size-[17px]" />
      <span className="hidden sm:inline">سبد خرید</span>
      {quantity > 0 ? (
        <span className="bg-ink absolute -top-1.5 -left-1.5 grid size-5 place-items-center rounded-full text-[11px] font-bold text-white">
          {toPersianDigits(quantity)}
        </span>
      ) : null}
    </Link>
  );
}
