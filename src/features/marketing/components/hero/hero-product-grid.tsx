'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import type { HeroSlide } from '../../types';
import { HeroGridCard } from './hero-grid-card';
import { HeroSlideSpecs } from './hero-slide-specs';
import styles from './hero.module.css';

/** Max cards shown at once; the rest of the featured pool rotates in randomly. */
const MAX_VISIBLE = 4;

/** Fisher–Yates: `count` random items of `items`, without repeats. */
function pickRandom<T>(items: T[], count: number): T[] {
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j] as T, pool[i] as T];
  }
  return pool.slice(0, count);
}

/**
 * Featured products side by side (≤4, picked at random from the pool on every visit).
 * SSR renders the first 4 (deterministic, no hydration mismatch); the random pick is
 * swapped in on mount while the cards are still hidden by their entrance animation. 1 → single card with floating specs;
 * 2/4 → two columns, second column offset down; 3 → first card spans both rows.
 */
export function HeroProductGrid({ slides: pool }: { slides: HeroSlide[] }) {
  const [slides, setSlides] = useState(() => pool.slice(0, MAX_VISIBLE));
  useEffect(() => {
    if (pool.length > MAX_VISIBLE) setSlides(pickRandom(pool, MAX_VISIBLE));
  }, [pool]);
  const count = slides.length;
  const single = slides[0];

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-6 -z-10 rounded-full bg-(image:--gradient-brand) opacity-[0.14] blur-3xl"
      />
      <div className={styles.ring} aria-hidden />
      <div className={styles.ground} aria-hidden />
      {count === 1 && single ? (
        <div className="relative">
          <HeroGridCard slide={single} priority delayMs={350} />
          <HeroSlideSpecs specs={single.specs} />
        </div>
      ) : (
        <ul
          aria-label="محصولات ویژه"
          className={cn(
            // موبایل: ارتفاع طبیعی کارت‌ها تا تصویر محصول در خانه‌ی مربعی کوچک نشود
            'relative mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:aspect-square sm:gap-5',
            count === 2 ? 'sm:grid-rows-1' : 'sm:grid-rows-2',
          )}
        >
          {slides.map((slide, i) => {
            const tall = count === 3 && i === 0;
            return (
              <li
                key={slide.key}
                className={cn(
                  'flex min-h-0',
                  tall && 'row-span-2',
                  count !== 3 && i % 2 === 1 && 'translate-y-5 sm:translate-y-8',
                )}
              >
                <HeroGridCard
                  slide={slide}
                  fill
                  priority={i < 2}
                  delayMs={300 + i * 110}
                  className="w-full"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
