'use client';

import { useEffect, useState, type RefObject } from 'react';

/** Whether `ref`'s element intersects the viewport. Starts `true` so SSR never flashes UI. */
export function useInView(ref: RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry?.isIntersecting ?? true),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
