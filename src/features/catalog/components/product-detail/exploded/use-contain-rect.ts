'use client';

import { useEffect, useRef, useState } from 'react';

export type ContainRect = { left: number; top: number; width: number; height: number };
export type NaturalSize = { w: number; h: number };

/**
 * Geometry of an `object-contain` image inside its box. Part hotspots are saved in the admin as
 * percent of the *image*, so positioning them against the letterboxed box would drift.
 */
export function useContainRect(natural: NaturalSize | null) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<ContainRect | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !natural || natural.w <= 0 || natural.h <= 0) return;

    const measure = () => {
      const { clientWidth: boxW, clientHeight: boxH } = node;
      if (!boxW || !boxH) return;
      const scale = Math.min(boxW / natural.w, boxH / natural.h);
      const width = natural.w * scale;
      const height = natural.h * scale;
      setRect({ width, height, left: (boxW - width) / 2, top: (boxH - height) / 2 });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [natural]);

  return { ref, rect };
}
