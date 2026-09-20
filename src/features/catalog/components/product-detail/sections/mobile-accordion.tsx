'use client';

import { useId, useState, type ReactNode } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

type MobileAccordionProps = {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

/** Collapsible below `md`; always expanded (header hidden) from `md` up. Content stays in the DOM for SEO. */
export function MobileAccordion({ title, defaultOpen = false, children }: MobileAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="border-hairline focus-visible:ring-brand-500 flex min-h-11 w-full items-center justify-between rounded-xl border px-4 text-sm font-bold focus-visible:ring-2 focus-visible:outline-none md:hidden"
      >
        {title}
        <Icon
          name="chevronDown"
          className={cn('size-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <div id={panelId} className={cn('mt-3 md:mt-0 md:block', !open && 'hidden')}>
        {children}
      </div>
    </div>
  );
}
