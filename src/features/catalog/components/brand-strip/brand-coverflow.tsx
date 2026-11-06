'use client';

import { useCallback, useEffect, useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { Brand } from '../../types';
import { BrandTile } from './brand-tile';
import styles from './brand-strip.module.css';

const STEP_MS = 2800;
/** Tiles further than this from the center are hidden. */
const MAX_VISIBLE = 3;

/** Signed circular distance from `active` — positive = later brands (shown toward the inline end). */
function offsetOf(i: number, active: number, count: number) {
  let d = (i - active) % count;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

const ARROW =
  'bg-surface ring-hairline text-foreground hover:text-brand-600 focus-visible:ring-brand-500 absolute top-1/2 z-50 grid size-11 -translate-y-1/2 place-items-center rounded-full shadow-(--shadow-soft) ring-1 transition-colors focus-visible:ring-2 focus-visible:outline-none';

/**
 * Coverflow: the center brand is full size and in color, neighbours shrink and fade step by
 * step. Advances one step every few seconds; pauses on hover/focus, hidden tab, reduced motion.
 * Clicking a side tile centers it; clicking the center tile opens the brand's products.
 */
export function BrandCoverflow({ brands }: { brands: Brand[] }) {
  const count = brands.length;
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  const step = useCallback((by: number) => setActive((i) => (i + by + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setCanAnimate(!mq.matches && !document.hidden);
    sync();
    mq.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      mq.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    if (!canAnimate || held) return;
    const timer = setInterval(() => step(1), STEP_MS);
    return () => clearInterval(timer);
  }, [canAnimate, held, step]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="برندهای همکار"
      className={cn('relative', styles.stage)}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      }}
    >
      {brands.map((brand, i) => {
        const offset = offsetOf(i, active, count);
        const isActive = offset === 0;
        const hidden = Math.abs(offset) > MAX_VISIBLE;
        return (
          <div
            key={brand.id}
            data-offset={hidden ? 'hidden' : offset}
            aria-hidden={!isActive}
            className={styles.slot}
            onClickCapture={(e) => {
              if (isActive) return;
              e.preventDefault();
              setActive(i);
            }}
          >
            <BrandTile brand={brand} active={isActive} tabIndex={isActive ? 0 : -1} />
          </div>
        );
      })}
      <button
        type="button"
        aria-label="برند قبلی"
        onClick={() => step(-1)}
        className={cn(ARROW, 'start-0')}
      >
        <Icon name="chevronEnd" className="size-5 rotate-180" />
      </button>
      <button
        type="button"
        aria-label="برند بعدی"
        onClick={() => step(1)}
        className={cn(ARROW, 'end-0')}
      >
        <Icon name="chevronEnd" className="size-5" />
      </button>
    </div>
  );
}
