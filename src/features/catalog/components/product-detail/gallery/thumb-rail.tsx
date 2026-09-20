'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

import type { RailEntry } from './gallery-types';

const TILE = 72;
const GAP = 12;

type ThumbRailProps = {
  entries: RailEntry[];
  activeIndex: number;
  onSelect: (entry: RailEntry) => void;
};

/** Vertical rail (md+) with a ring that slides between tiles via translateY. */
export function ThumbRail({ entries, activeIndex, onSelect }: ThumbRailProps) {
  return (
    <ul className="relative hidden shrink-0 flex-col gap-3 md:flex" aria-label="تصاویر بندانگشتی">
      <span
        aria-hidden
        className="ring-brand-500 pointer-events-none absolute start-0 top-0 z-10 size-[72px] rounded-xl ring-2 transition-transform duration-200 ease-out motion-reduce:transition-none"
        // Runtime-computed slide offset.
        style={{ transform: `translateY(${activeIndex * (TILE + GAP)}px)` }}
      />
      {entries.map((entry, index) => (
        <li key={entry.key}>
          <button
            type="button"
            aria-label={entry.label}
            aria-current={index === activeIndex}
            onClick={() => onSelect(entry)}
            className={cn(
              'border-hairline bg-surface focus-visible:ring-brand-500 relative block size-[72px] overflow-hidden rounded-xl border focus-visible:ring-2 focus-visible:outline-none',
            )}
          >
            {entry.src ? (
              <Image
                src={entry.src}
                alt=""
                width={72}
                height={72}
                className="size-full object-contain p-1"
              />
            ) : (
              <span className="bg-surface-muted block size-full" />
            )}
            {entry.badge ? (
              <span className="bg-ink absolute inset-x-0 bottom-0 py-0.5 text-center text-[10px] font-bold text-white">
                {entry.badge}
              </span>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}
