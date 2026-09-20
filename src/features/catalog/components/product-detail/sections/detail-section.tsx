import type { ReactNode } from 'react';

import { Icon, type IconName } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { MobileAccordion } from './mobile-accordion';

type DetailSectionProps = {
  id: string;
  title: string;
  icon: IconName;
  children: ReactNode;
  /** Collapse into an accordion below `md` (the heading stays for screen readers). */
  accordion?: { defaultOpen?: boolean };
};

export function DetailSection({ id, title, icon, children, accordion }: DetailSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-hairline scroll-mt-40 border-t py-10 first:border-t-0"
    >
      <div className={cn('mb-6 flex items-center gap-3', accordion && 'max-md:sr-only')}>
        <span className="bg-surface-muted text-brand-600 grid size-9 place-items-center rounded-xl">
          <Icon name={icon} className="size-4" />
        </span>
        <h2 id={`${id}-heading`} className="text-[22px] font-bold tracking-tight">
          {title}
        </h2>
      </div>
      {accordion ? (
        <MobileAccordion title={title} defaultOpen={accordion.defaultOpen}>
          {children}
        </MobileAccordion>
      ) : (
        children
      )}
    </section>
  );
}
