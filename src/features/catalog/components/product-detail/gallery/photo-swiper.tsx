'use client';

import { useRef, useState } from 'react';

import { MediaPlaceholder } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { GalleryPhoto } from './gallery-types';

type PhotoSwiperProps = { photos: GalleryPhoto[]; onOpen: (index: number) => void };

/** Mobile main view: scroll-snap swiper with position dots. */
export function PhotoSwiper({ photos, onOpen }: PhotoSwiperProps) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    // RTL scrollLeft is negative in modern browsers — use its magnitude.
    setIndex(Math.round(Math.abs(track.scrollLeft) / track.clientWidth));
  };

  return (
    <div className="relative size-full">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex size-full snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`بزرگ‌نمایی ${photo.alt}`}
            className="size-full shrink-0 snap-center"
          >
            <MediaPlaceholder
              label={photo.alt}
              src={photo.url}
              priority={i === 0}
              sizes="100vw"
              className="size-full"
            />
          </button>
        ))}
      </div>
      {photos.length > 1 ? (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden>
          {photos.map((photo, i) => (
            <span
              key={photo.id}
              className={cn(
                'h-1.5 rounded-full transition-[width,background-color] duration-200',
                i === index ? 'bg-brand-500 w-5' : 'bg-foreground/25 w-1.5',
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
