import { createElement, type ElementType, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * One-shot fade + lift entrance. Pure CSS (`.reveal` in `animations.css`),
 * so it ships zero JS and always settles visible — safe for SEO and no-JS.
 */
export function Reveal({ children, as = 'div', className }: RevealProps) {
  return createElement(as, { className: cn('reveal', className) }, children);
}
