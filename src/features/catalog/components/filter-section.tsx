'use client';

import { useId, useState, type ReactNode } from 'react';

import { Icon, type IconName } from '@/components/atoms';
import { cn } from '@/lib/utils';

type FilterSectionProps = {
  title: string;
  icon: IconName;
  /** Current selection, shown as a pill next to the title so a collapsed section still tells. */
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

/** Collapsible facet group inside the catalog filter panel. */
export function FilterSection({
  title,
  icon,
  summary,
  defaultOpen = true,
  children,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <section className="border-hairline border-t py-1 first:border-t-0">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="group flex min-h-12 w-full cursor-pointer items-center justify-between gap-2 text-sm font-bold"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="bg-surface-muted text-foreground-muted group-hover:bg-brand-50 group-hover:text-brand-600 grid size-7 shrink-0 place-items-center rounded-lg transition-colors">
              <Icon name={icon} className="size-3.5" />
            </span>
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
              'text-foreground-muted group-hover:text-foreground size-4 shrink-0 transition-transform duration-300',
              open && 'rotate-180',
            )}
          />
        </button>
      </h3>
      <div id={bodyId} hidden={!open} className="animate-fade-in pt-1 pb-4">
        {children}
      </div>
    </section>
  );
}
