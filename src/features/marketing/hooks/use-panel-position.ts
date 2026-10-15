'use client';

import { useLayoutEffect, useState, type RefObject } from 'react';

type Position = { top: number; right: number };

/**
 * Viewport-relative `{ top, right }` for a fixed-position panel anchored under
 * `anchorRef`, kept in sync while open (scroll/resize can move the anchor —
 * the sticky header's `backdrop-filter` also makes `position: fixed` escape
 * via a portal, so this is computed in real viewport pixels).
 */
export function usePanelPosition(anchorRef: RefObject<HTMLElement | null>, open: boolean) {
  const [position, setPosition] = useState<Position | null>(null);

  useLayoutEffect(() => {
    if (!open) return;

    const measure = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({ top: rect.bottom + 10, right: window.innerWidth - rect.right });
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [open, anchorRef]);

  return position;
}
