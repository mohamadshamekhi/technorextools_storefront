'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';

import type { GalleryPhoto } from './gallery-types';

const SWIPE_PX = 50;

type LightboxProps = {
  photos: GalleryPhoto[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
};

const navButton =
  'absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none';

/** Fullscreen viewer: ←/→ (RTL-aware), Esc, and horizontal swipe. */
export function Lightbox({ photos, index, onIndex, onClose }: LightboxProps) {
  const [startX, setStartX] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = photos.length;
  const go = (delta: number) => onIndex((index + delta + count) % count);
  const photo = photos[index];

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      // RTL: the physical left arrow advances.
      if (event.key === 'ArrowLeft') onIndex((index + 1) % count);
      if (event.key === 'ArrowRight') onIndex((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, count, onClose, onIndex]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="نمایش بزرگ تصاویر"
      className="animate-fade-in fixed inset-0 z-[70] grid place-items-center bg-black/90"
      onPointerDown={(event) => setStartX(event.clientX)}
      onPointerUp={(event) => {
        if (startX !== null && Math.abs(event.clientX - startX) > SWIPE_PX)
          go(event.clientX < startX ? 1 : -1);
        setStartX(null);
      }}
    >
      <Image
        src={photo.url}
        alt={photo.alt}
        width={1200}
        height={1200}
        priority
        draggable={false}
        className="max-h-[88vh] w-auto max-w-[92vw] rounded-2xl bg-white object-contain"
      />
      <button
        ref={closeRef}
        type="button"
        aria-label="بستن"
        onClick={onClose}
        className="absolute start-4 top-4 grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        <Icon name="close" className="size-5" />
      </button>
      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="تصویر بعدی"
            onClick={() => go(1)}
            className={`${navButton} end-4`}
          >
            <Icon name="chevronEnd" className="size-5" />
          </button>
          <button
            type="button"
            aria-label="تصویر قبلی"
            onClick={() => go(-1)}
            className={`${navButton} start-4`}
          >
            <Icon name="chevronEnd" className="size-5 rotate-180" />
          </button>
          <p className="absolute bottom-5 text-sm text-white/80" aria-live="polite">
            {toPersianDigits(index + 1)} / {toPersianDigits(count)}
          </p>
        </>
      ) : null}
    </div>
  );
}
