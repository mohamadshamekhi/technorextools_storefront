import { createElement, type ElementType, type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

/** Centered page-width wrapper with the shared responsive gutter. */
export function Container({ as = 'div', className, ...props }: ContainerProps) {
  return createElement(as, {
    className: cn('mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12', className),
    ...props,
  });
}
