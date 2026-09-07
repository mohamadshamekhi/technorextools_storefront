import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type FilterSectionProps = {
  title: string;
  children: ReactNode;
  /** Drop the divider on the last section. */
  last?: boolean;
};

export function FilterSection({ title, children, last }: FilterSectionProps) {
  return (
    <div className={cn('pb-4', !last && 'border-hairline mb-4 border-b')}>
      <h3 className="mb-3 text-sm font-bold">{title}</h3>
      {children}
    </div>
  );
}
