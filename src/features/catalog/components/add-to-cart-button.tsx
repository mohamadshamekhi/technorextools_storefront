'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

import { useCartLineQuantity } from '../hooks/use-cart-line-quantity';
import { CardQuantityStepper } from './card-quantity-stepper';

type AddToCartButtonProps = {
  id: string;
  title: string;
  price: number;
  slug: string;
  imageUrl?: string | null;
  variant?: string;
  quantity?: number;
  /** Round icon-only button for dense cards. */
  compact?: boolean;
  className?: string;
};

export function AddToCartButton({
  id,
  title,
  price,
  slug,
  imageUrl,
  variant,
  quantity = 1,
  compact = false,
  className,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const lineQuantity = useCartLineQuantity(id);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, title, price, variant, compareAt: null, categorySlug: slug, imageUrl }, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  if (compact && lineQuantity > 0) {
    return (
      <CardQuantityStepper quantity={lineQuantity} onChange={(next) => setQuantity(id, next)} />
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={added ? 'به سبد اضافه شد' : `افزودن ${title} به سبد خرید`}
      className={cn(
        'bg-brand-500 flex cursor-pointer items-center justify-center bg-(image:--gradient-brand) text-white shadow-(--shadow-brand) transition-[filter,transform] duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95',
        compact
          ? 'size-11 shrink-0 rounded-full'
          : 'mt-auto w-full gap-2 rounded-xl py-3 text-sm font-bold',
        added && 'bg-success bg-none shadow-none',
        className,
      )}
    >
      <Icon name={added ? 'check' : 'cart'} className={compact ? 'size-5' : 'size-4'} />
      {compact ? null : added ? 'به سبد اضافه شد' : 'افزودن به سبد خرید'}
    </button>
  );
}
