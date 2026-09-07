import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import styles from './marquee.module.css';

export type MarqueeProps = {
  children: ReactNode;
  /** Accessible summary of the looping content. */
  label: string;
  speed?: 'slow' | 'normal' | 'fast';
  reverse?: boolean;
  className?: string;
};

/**
 * Seamless horizontal loop. Renders the row twice — the copy is
 * `aria-hidden`, so screen readers announce the content once.
 */
export function Marquee({ children, label, speed = 'normal', reverse, className }: MarqueeProps) {
  return (
    <div className={cn(styles.viewport, className)} role="marquee" aria-label={label}>
      <div className={cn(styles.track, styles[speed], reverse && styles.reverse)}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
