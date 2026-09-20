'use client';

import { useState } from 'react';

import type { Hotspot } from '../../../types/pdp';

/** Numbered dot that toggles a small info card. Rendered inside drei `<Html>`. */
export function HotspotMarker({ hotspot, index }: { hotspot: Hotspot; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-label={`نقطه ${hotspot.label}`}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => event.stopPropagation()}
        className="bg-accent-500 text-ink focus-visible:ring-brand-500 grid size-8 place-items-center rounded-full text-xs font-extrabold shadow-(--shadow-accent) ring-2 ring-white focus-visible:outline-none"
      >
        {index + 1}
      </button>
      {open ? (
        <div
          role="note"
          className="bg-surface absolute start-1/2 top-10 z-10 w-44 -translate-x-1/2 rounded-xl p-3 text-start shadow-(--shadow-float)"
        >
          <p className="text-sm font-bold">{hotspot.label}</p>
          <p className="text-foreground-muted mt-1 text-xs leading-5">{hotspot.description}</p>
        </div>
      ) : null}
    </div>
  );
}
