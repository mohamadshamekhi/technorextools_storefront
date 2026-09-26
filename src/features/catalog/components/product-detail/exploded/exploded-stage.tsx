'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';

import { useContainRect, type NaturalSize } from './use-contain-rect';

type ExplodedStageProps = { src: string; alt: string; onOpen: () => void; children: ReactNode };

/**
 * Exploded diagram stage. Unlike `PhotoStage` it exposes the contained image rect so hotspot
 * markers land exactly where the admin placed them, at any container size.
 */
export function ExplodedStage({ src, alt, onOpen, children }: ExplodedStageProps) {
  const [natural, setNatural] = useState<NaturalSize | null>(null);
  const { ref, rect } = useContainRect(natural);

  return (
    <div ref={ref} className="relative size-full">
      <button
        type="button"
        onClick={onOpen}
        aria-label="بزرگ‌نمایی نقشه انفجاری"
        className="focus-visible:ring-brand-500 absolute inset-0 cursor-zoom-in focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="object-contain"
          onLoad={(event) =>
            setNatural({
              w: event.currentTarget.naturalWidth,
              h: event.currentTarget.naturalHeight,
            })
          }
        />
      </button>
      {rect ? (
        <div
          // Runtime-computed overlay matching the contained image rect.
          style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }}
          className="pointer-events-none absolute"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
