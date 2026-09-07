import { createElement, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3';
type HeadingProps = HTMLAttributes<HTMLHeadingElement> & { as?: HeadingLevel };

const HEADING_STYLES: Record<HeadingLevel, string> = {
  h1: 'text-4xl font-bold tracking-tight sm:text-5xl',
  h2: 'text-2xl font-semibold tracking-tight sm:text-3xl',
  h3: 'text-lg font-semibold',
};

export function Heading({ as = 'h2', className, ...props }: HeadingProps) {
  return createElement(as, {
    className: cn(HEADING_STYLES[as], 'text-balance', className),
    ...props,
  });
}

export function Text({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-foreground-muted text-sm leading-relaxed', className)} {...props} />
  );
}
