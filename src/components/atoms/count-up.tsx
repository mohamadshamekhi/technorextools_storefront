'use client';

import { useEffect, useRef, useState } from 'react';

export type CountUpProps = {
  to: number;
  /** Milliseconds for the sweep. */
  duration?: number;
  suffix?: string;
  /** Digit/grouping formatter. Defaults to Persian locale digits. */
  format?: (value: number) => string;
};

const faFormat = (value: number) => value.toLocaleString('fa-IR');

/** Animates 0 → `to` the first time it scrolls into view. */
export function CountUp({ to, duration = 1400, suffix = '', format = faFormat }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Render the real figure server-side so no-JS crawlers see it, then
  // rewind + sweep on the client.
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    setValue(0);
    let raf = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {format(value)}
      {suffix}
    </span>
  );
}
