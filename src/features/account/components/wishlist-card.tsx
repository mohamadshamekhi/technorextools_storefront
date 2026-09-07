'use client';

import { useState } from 'react';

import { Icon, MediaPlaceholder } from '@/components/atoms';
import { formatToman } from '@/lib/persian';

import type { WishlistItem } from '../types';

export function WishlistCard({ item }: { item: WishlistItem }) {
  const [removed, setRemoved] = useState(false);
  if (removed) return null;

  return (
    <div className="border-hairline bg-surface overflow-hidden rounded-2xl border shadow-sm">
      <MediaPlaceholder label="عکس محصول" className="aspect-square text-[11px]" />
      <div className="p-4">
        <p className="line-clamp-2 min-h-[2.5rem] text-[13.5px] leading-relaxed font-bold">
          {item.title}
        </p>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="font-display text-[15px] font-bold">
            {formatToman(item.price)}{' '}
            <span className="font-sans text-foreground-muted text-[11px] font-medium">تومان</span>
          </span>
          <button
            type="button"
            aria-label={`حذف ${item.title} از علاقه‌مندی‌ها`}
            onClick={() => setRemoved(true)}
            className="border-hairline bg-surface-sunken hover:border-sale/50 grid size-8 place-items-center rounded-lg border transition-colors"
          >
            <Icon name="trash" className="text-sale size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
