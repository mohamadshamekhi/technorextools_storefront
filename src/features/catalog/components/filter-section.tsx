'use client';

import { useId, useState, type ReactNode } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

type FilterSectionProps = {
  title: string;
  /** Current selection, shown as a pill next to the title so a collapsed section still tells. */
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

/** Collapsible facet group inside the catalog filter panel. */
export function FilterSection({
  title,
  summary,
  defaultOpen = true,
  children,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <section className="border-hairline border-t pt-3">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="hover:text-brand-600 flex min-h-10 w-full cursor-pointer items-center justify-between gap-2 text-sm font-bold transition-colors"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="shrink-0">{title}</span>
            {summary ? (
              <span className="bg-brand-50 text-brand-700 truncate rounded-full px-2 py-0.5 text-[11px] font-bold">
                {summary}
              </span>
            ) : null}
          </span>
          <Icon
            name="chevronDown"
            className={cn(
              'text-foreground-muted size-4 shrink-0 transition-transform',
              open && 'rotate-180',
            )}
          />
        </button>
      </h3>
      <div id={bodyId} hidden={!open} className="pt-2 pb-1">
        {children}
      </div>
    </section>
  );
}
