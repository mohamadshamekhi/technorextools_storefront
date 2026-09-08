'use client';

import { useState } from 'react';

import { Icon, MediaPlaceholder } from '@/components/atoms';

import { PRODUCT_SHOT } from '../../data/media';
import { discountPercent, toPersianDigits } from '../../utils/persian';
import { GalleryThumb } from './gallery-thumb';
import { ProductStage } from './product-stage';

type ProductGalleryProps = {
  images: string[];
  price: number;
  compareAt: number | null;
};

const TOOLBAR = [
  { icon: 'heart', label: 'افزودن به علاقه‌مندی‌ها' },
  { icon: 'refresh', label: 'افزودن به مقایسه' },
  { icon: 'telegram', label: 'اشتراک‌گذاری' },
] as const;

export function ProductGallery({ images, price, compareAt }: ProductGalleryProps) {
  const [mode, setMode] = useState<'photo' | 'stage'>('photo');
  const [photo, setPhoto] = useState(0);
  const off = compareAt ? discountPercent(price, compareAt) : 0;

  return (
    <div className="flex items-start gap-3.5">
      <div className="flex-1">
        <div className="border-hairline bg-surface relative aspect-square overflow-hidden rounded-3xl border">
          {mode === 'photo' ? (
            <MediaPlaceholder
              label={images[photo] ?? 'عکس محصول'}
              src={PRODUCT_SHOT}
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="size-full text-xs"
            />
          ) : (
            <div className="absolute inset-0">
              <ProductStage />
            </div>
          )}

          {off > 0 ? (
            <span className="bg-sale absolute end-4 top-4 z-10 rounded-full px-3 py-1 text-[12px] font-extrabold text-white">
              {toPersianDigits(off)}٪ تخفیف
            </span>
          ) : null}

          {mode === 'photo' ? (
            <button
              type="button"
              onClick={() => setMode('stage')}
              className="bg-ink absolute bottom-4 start-4 z-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              <Icon name="cube" className="size-4" />
              چرخش سه‌بعدی محصول
            </button>
          ) : (
            <span className="bg-surface/90 text-foreground-muted absolute bottom-4 start-4 z-10 flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold">
              <Icon name="rotate3d" className="text-brand-600 size-3.5" />
              بکشید و بچرخانید
            </span>
          )}
        </div>

        <div className="mt-3.5 flex gap-2.5">
          {images.map((label, index) => (
            <GalleryThumb
              key={label}
              label={label}
              active={mode === 'photo' && photo === index}
              onClick={() => {
                setMode('photo');
                setPhoto(index);
              }}
            >
              <MediaPlaceholder src={PRODUCT_SHOT} label={label} sizes="64px" className="size-full" />
            </GalleryThumb>
          ))}
          <GalleryThumb
            label="نمای سه‌بعدی"
            active={mode === 'stage'}
            onClick={() => setMode('stage')}
          >
            <Icon name="cube" className="text-brand-600 size-5" />
          </GalleryThumb>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {TOOLBAR.map((tool) => (
          <button
            key={tool.icon}
            type="button"
            aria-label={tool.label}
            className="border-hairline hover:border-brand-500 grid size-10 place-items-center rounded-xl border transition-colors"
          >
            <Icon name={tool.icon} className="text-foreground-muted size-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
