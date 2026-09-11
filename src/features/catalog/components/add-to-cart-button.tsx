'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

type AddToCartButtonProps = {
  id: string;
  title: string;
  price: number;
  slug: string;
  imageUrl?: string | null;
  variant?: string;
  quantity?: number;
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
  className,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, title, price, variant, compareAt: null, categorySlug: slug, imageUrl }, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={cn(
        'bg-surface-sunken border-hairline hover:bg-brand-500 hover:border-brand-500 mt-auto flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition-colors hover:text-white',
        added && 'border-brand-500 bg-brand-500 bg-(image:--gradient-brand) text-white',
        className,
      )}
    >
      <Icon name={added ? 'check' : 'cart'} className="size-4" />
      {added ? 'به سبد اضافه شد' : 'افزودن به سبد خرید'}
    </button>
  );
}
