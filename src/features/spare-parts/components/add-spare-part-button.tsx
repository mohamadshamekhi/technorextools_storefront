'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

type AddSparePartButtonProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string | null;
  partNumber: string | null;
  stockQty: number;
  className?: string;
};

export function AddSparePartButton({
  id,
  title,
  price,
  imageUrl,
  partNumber,
  stockQty,
  className,
}: AddSparePartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const inCart = useCartStore((state) => state.lines.find((line) => line.id === id)?.quantity ?? 0);
  const [added, setAdded] = useState(false);
  const soldOut = stockQty <= 0 || inCart >= stockQty;

  const handleAdd = () => {
    addItem(
      {
        id,
        title,
        price,
        variant: partNumber ? `قطعه ${partNumber}` : 'قطعه یدکی',
        imageUrl,
        kind: 'spare_part',
      },
      1,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={soldOut}
      className={cn(
        'bg-brand-500 disabled:bg-surface-sunken disabled:text-foreground-muted flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(image:--gradient-brand) px-4 py-3 text-sm font-bold text-white shadow-(--shadow-brand) transition-[filter,transform] duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:bg-none disabled:shadow-none',
        added && 'bg-success bg-none shadow-none',
        className,
      )}
    >
      <Icon name={added ? 'check' : 'cart'} className="size-4" />
      {stockQty <= 0 ? 'ناموجود' : added ? 'به سبد اضافه شد' : 'افزودن به سبد خرید'}
    </button>
  );
}
