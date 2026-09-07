import type { SVGAttributes } from 'react';

import { cn } from '@/lib/utils';

import { ICON_PATHS, type IconName } from './icon-paths';

export type IconProps = Omit<SVGAttributes<SVGSVGElement>, 'name'> & {
  name: IconName;
  /** Accessible label. Omit for purely decorative icons (default). */
  title?: string;
};

/** Single stroked-line icon renderer. 1em-sized; drive it with `text-*` + `size-*`. */
export function Icon({ name, title, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-[1em] shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {ICON_PATHS[name]}
    </svg>
  );
}
