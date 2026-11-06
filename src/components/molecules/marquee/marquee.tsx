import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import styles from './marquee.module.css';

export type MarqueeProps = {
  children: ReactNode;
  /** Accessible summary of the looping content. */
  label: string;
  speed?: 'slow' | 'normal' | 'fast';
  /** Repeats per half of the loop — raise it until one half is wider than the widest screen, or a gap shows. */
  copies?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Seamless horizontal loop. Renders the row in two equal halves — every copy but
 * the first is `aria-hidden`, so screen readers announce the content once.
 */
export function Marquee({
  children,
  label,
  speed = 'normal',
  copies = 1,
  reverse,
  className,
}: MarqueeProps) {
  const extras = Array.from({ length: copies - 1 }, (_, i) => (
    <div key={i} className="flex shrink-0 items-center" aria-hidden>
      {children}
    </div>
  ));

  return (
    <div className={cn(styles.viewport, className)} role="marquee" aria-label={label}>
      <div className={cn(styles.track, styles[speed], reverse && styles.reverse)}>
        <div className="flex shrink-0 items-center">{children}</div>
        {extras}
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
        {extras}
      </div>
    </div>
  );
}
