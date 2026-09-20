'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { useAddWishlistItem, useRemoveWishlistItem } from '../hooks/use-wishlist';

type WishlistButtonProps = {
  productId: string;
  title: string;
  /** `overlay` = round icon button on a product card image; `inline` = square button in a buy box. */
  variant?: 'overlay' | 'inline';
  className?: string;
};

/** Toggle button to add/remove a product from the signed-in customer's wishlist. */
export function WishlistButton({
  productId,
  title,
  variant = 'overlay',
  className,
}: WishlistButtonProps) {
  const [active, setActive] = useState(false);
  const addItem = useAddWishlistItem();
  const removeItem = useRemoveWishlistItem();
  const pending = addItem.isPending || removeItem.isPending;

  const handleToggle = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (pending) return;

    if (active) {
      setActive(false);
      removeItem.mutate(productId, { onError: () => setActive(true) });
    } else {
      setActive(true);
      addItem.mutate(productId, { onError: () => setActive(false) });
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={pending}
      aria-pressed={active}
      aria-label={active ? `حذف ${title} از علاقه‌مندی‌ها` : `افزودن ${title} به علاقه‌مندی‌ها`}
      className={cn(
        'border-hairline grid place-items-center rounded-full border transition-colors disabled:opacity-50',
        variant === 'overlay'
          ? 'bg-surface/90 hover:border-sale/50 size-9 shadow-(--shadow-soft) backdrop-blur'
          : 'bg-surface-sunken hover:border-sale/50 size-11 rounded-xl',
        className,
      )}
    >
      <Icon
        name="heart"
        className={cn(
          'size-4 transition-colors',
          active ? 'fill-sale text-sale' : 'text-foreground-muted',
        )}
      />
    </button>
  );
}
