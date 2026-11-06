import { cn } from '@/lib/utils';

import type { HeroSlide } from '../../types';
import { HeroGridCard } from './hero-grid-card';
import { HeroSlideSpecs } from './hero-slide-specs';
import styles from './hero.module.css';

/**
 * All featured products side by side (≤4). 1 → single card with floating specs;
 * 2/4 → two columns, second column offset down; 3 → first card spans both rows.
 */
export function HeroProductGrid({ slides }: { slides: HeroSlide[] }) {
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
            'relative mb-8 grid aspect-square grid-cols-2 gap-3 sm:gap-5',
            count === 2 ? 'grid-rows-1' : 'grid-rows-2',
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
                  count !== 3 && i % 2 === 1 && 'translate-y-8',
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
