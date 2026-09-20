'use client';

import { useEffect, useState } from 'react';

const THRESHOLD_PX = 8;

/** `'down'` while the user scrolls down, `'up'` while scrolling up (ignores jitter). */
export function useScrollDirection(): 'up' | 'down' {
  const [direction, setDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (Math.abs(current - last) < THRESHOLD_PX) return;
      setDirection(current > last ? 'down' : 'up');
      last = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return direction;
}
