import { createElement, type ElementType, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger offset in ms — runtime-computed per grid index, e.g. `index * 60`. */
  delayMs?: number;
};

/**
 * One-shot fade + lift entrance. Pure CSS (`.reveal` in `animations.css`),
 * so it ships zero JS and always settles visible — safe for SEO and no-JS.
 */
export function Reveal({ children, as = 'div', className, delayMs }: RevealProps) {
  return createElement(
    as,
    {
      className: cn('reveal', className),
      // Genuinely runtime-computed (grid position) — the one sanctioned inline-style case.
      style: delayMs ? { animationDelay: `${delayMs}ms` } : undefined,
    },
    children,
  );
}
