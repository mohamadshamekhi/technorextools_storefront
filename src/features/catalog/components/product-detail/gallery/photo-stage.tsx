'use client';

import { useState, type PointerEvent } from 'react';

import { MediaPlaceholder } from '@/components/atoms';

import type { GalleryPhoto } from './gallery-types';

const ZOOM = 2.2;

type PhotoStageProps = { photo: GalleryPhoto | undefined; onOpen: () => void };

/** Desktop main view: hover magnifier, click opens the lightbox. */
export function PhotoStage({ photo, onOpen }: PhotoStageProps) {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const track = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    });
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={track}
      onPointerLeave={() => setOrigin(null)}
      aria-label="بزرگ‌نمایی تصویر"
      className="focus-visible:ring-brand-500 relative block size-full cursor-zoom-in overflow-hidden focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
    >
      <MediaPlaceholder
        label={photo?.alt ?? 'تصویر محصول'}
        src={photo?.url}
        sizes="(max-width: 1024px) 100vw, 56vw"
        priority
        className="size-full"
      />
      {origin && photo ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-white bg-no-repeat"
          // Runtime-computed magnifier position.
          style={{
            backgroundImage: `url("${photo.url}")`,
            backgroundSize: `${ZOOM * 86}%`,
            backgroundPosition: `${origin.x}% ${origin.y}%`,
          }}
        />
      ) : null}
    </button>
  );
}
