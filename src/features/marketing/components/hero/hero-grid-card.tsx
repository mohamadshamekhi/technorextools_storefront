import Link from 'next/link';
import type { CSSProperties } from 'react';

import { Icon, MediaPlaceholder } from '@/components/atoms';
import { formatToman } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { HeroSlide } from '../../types';
import styles from './hero.module.css';

type HeroGridCardProps = {
  slide: HeroSlide;
  /** Art grows to fill a fixed-size grid cell instead of keeping a square ratio. */
  fill?: boolean;
  priority?: boolean;
  className?: string;
  /** Entrance stagger offset in ms — runtime-computed per card index. */
  delayMs: number;
};

/** Featured-product card in the hero grid: art, brand/category, title, price; whole card links to the PDP. */
export function HeroGridCard({ slide, fill, priority, className, delayMs }: HeroGridCardProps) {
  const body = (
    <>
      <MediaPlaceholder
        label={slide.title}
        src={slide.image}
        priority={priority}
        sizes="(max-width: 1024px) 45vw, 22vw"
        className={cn('rounded-3xl', fill ? 'min-h-0 flex-1' : 'aspect-square')}
      />
      <div className="flex items-end gap-2 px-1.5 pt-3 pb-1">
        <div className="min-w-0 flex-1">
          {slide.eyebrow && (
            <p className="text-brand-600 truncate text-[11px] leading-5 font-bold">
              {slide.eyebrow}
            </p>
          )}
          <p className="text-foreground line-clamp-2 text-[13px] leading-5 font-extrabold sm:text-sm">
            {slide.title}
          </p>
          {slide.price !== null && (
            <p className="text-foreground-muted mt-1 text-[11px] leading-5">
              <span className="font-display text-foreground text-[13px] font-black sm:text-sm">
                {formatToman(slide.price)}
              </span>{' '}
              تومان
            </p>
          )}
        </div>
        {slide.href && (
          <span
            aria-hidden
            className="bg-brand-500 text-surface group-hover:bg-brand-600 hidden size-9 shrink-0 place-items-center rounded-full transition-[background-color,translate] duration-300 group-hover:-translate-x-1 sm:grid"
          >
            <Icon name="chevronEnd" className="size-4" />
          </span>
        )}
      </div>
    </>
  );

  const shell = cn(
    'group bg-surface/90 ring-hairline flex flex-col rounded-4xl p-2 shadow-(--shadow-float) ring-1 backdrop-blur-sm sm:p-2.5',
    styles.gridCard,
    className,
  );
  // Genuinely runtime-computed stagger (card index) — same sanctioned case as HeroFloatingCard.
  const style = { '--card-delay': `${delayMs}ms` } as CSSProperties;

  return slide.href ? (
    <Link
      href={slide.href}
      className={cn(
        shell,
        'focus-visible:ring-brand-500 focus-visible:ring-2 focus-visible:outline-none',
      )}
      style={style}
    >
      {body}
    </Link>
  ) : (
    <div className={shell} style={style}>
      {body}
    </div>
  );
}
