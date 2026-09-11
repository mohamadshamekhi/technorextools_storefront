'use client';

import { useState } from 'react';

import { MediaPlaceholder } from '@/components/atoms';
import { cn } from '@/lib/utils';
import { toPersianDigits } from '@/lib/persian';

import type { ProductImage } from '../../types';

type ProductGalleryProps = {
  images: ProductImage[];
  isAmazingDeal: boolean;
};

/** Image gallery. `abzar/api` returns absolute image URLs on the arvanstorage.ir host. */
export function ProductGallery({ images, isAmazingDeal }: ProductGalleryProps) {
  const slots = images.length > 0 ? images : [{ id: 'main', alt: 'عکس محصول' } as Partial<ProductImage>];
  const [active, setActive] = useState(0);
  const activeSlot = slots[active];

  return (
    <div>
      <div className="border-hairline bg-surface relative aspect-square overflow-hidden rounded-3xl border">
        <MediaPlaceholder
          label={activeSlot?.alt ?? 'عکس محصول'}
          src={activeSlot?.url}
          priority
          className="size-full text-xs"
        />
        {isAmazingDeal ? (
          <span className="bg-sale absolute end-4 top-4 z-10 rounded-full px-3 py-1 text-[12px] font-extrabold text-white">
            شگفت‌انگیز
          </span>
        ) : null}
      </div>

      {slots.length > 1 ? (
        <div className="mt-3.5 flex gap-2.5">
          {slots.map((image, index) => (
            <button
              key={image.id ?? index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`تصویر ${toPersianDigits(index + 1)}`}
              className={cn(
                'border-hairline size-16 overflow-hidden rounded-xl border transition-colors',
                active === index && 'border-brand-500',
              )}
            >
              <MediaPlaceholder label={image.alt ?? ''} src={image.url} className="size-full" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
