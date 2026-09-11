'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import type { UpsellProduct } from '../types';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

export function UpsellAddButton({ product }: { product: UpsellProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      compareAt: null,
      categorySlug: product.categorySlug,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`افزودن ${product.title} به سبد`}
      className={cn(
        'border-hairline hover:bg-brand-500 hover:border-brand-500 grid size-8 place-items-center rounded-lg border transition-colors',
        added && 'bg-brand-500 border-brand-500',
      )}
    >
      <Icon
        name={added ? 'check' : 'plus'}
        className={cn('text-foreground-muted size-3.5', added && 'text-white')}
      />
    </button>
  );
}
