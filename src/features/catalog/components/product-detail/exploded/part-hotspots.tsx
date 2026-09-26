'use client';

import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { ExplodedPart } from '../../../types/pdp';

type PartHotspotsProps = {
  parts: ExplodedPart[];
  active: number | null;
  pinned: number | null;
  onActive: (part: number | null) => void;
  onPin: (part: number) => void;
};

/** Numbered markers over the image — only for parts that carry a `hotspot` position. */
export function PartHotspots({ parts, active, pinned, onActive, onPin }: PartHotspotsProps) {
  return (
    <>
      {parts.map((part) =>
        part.hotspot ? (
          <button
            key={part.number}
            type="button"
            aria-pressed={pinned === part.number}
            aria-label={`قطعه ${toPersianDigits(part.number)}: ${part.name}`}
            onClick={() => onPin(part.number)}
            onPointerEnter={() => onActive(part.number)}
            onPointerLeave={() => onActive(null)}
            onFocus={() => onActive(part.number)}
            onBlur={() => onActive(null)}
            className={cn(
              'focus-visible:ring-brand-500 pointer-events-auto absolute z-10 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-extrabold ring-2 ring-white transition-[transform,opacity] duration-200 focus-visible:outline-none',
              active === part.number
                ? 'bg-brand-600 scale-110 text-white'
                : 'bg-accent-500 text-ink',
              active !== null && active !== part.number && 'opacity-40',
            )}
            // Runtime-computed marker position (percent of image).
            style={{ left: `${part.hotspot.x}%`, top: `${part.hotspot.y}%` }}
          >
            {toPersianDigits(part.number)}
          </button>
        ) : null,
      )}
    </>
  );
}
