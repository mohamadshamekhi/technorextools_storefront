import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type SectionHeadingProps = {
  title: string;
  /** Small Latin kicker above the title. */
  eyebrow?: string;
  /** Anchors `aria-labelledby` from the parent section. */
  id?: string;
  align?: 'start' | 'center';
  /** Trailing control — a "view all" link, tabs, etc. */
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  id,
  align = 'start',
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className="flex flex-col gap-2.5">
        {eyebrow ? (
          <span className="font-display text-brand-600 text-xs tracking-[0.2em]">{eyebrow}</span>
        ) : null}
        <h2 id={id} className="text-3xl font-black tracking-tight text-balance sm:text-[2.35rem]">
          {title}
        </h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
