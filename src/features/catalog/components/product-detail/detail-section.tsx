import type { ReactNode } from 'react';

import { Icon, type IconName } from '@/components/atoms';

type DetailSectionProps = {
  id: string;
  title: string;
  icon: IconName;
  children: ReactNode;
};

export function DetailSection({ id, title, icon, children }: DetailSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 border-t border-hairline py-10 first:border-t-0">
      <div className="mb-6 flex items-center gap-3">
        <span className="bg-brand-50 text-brand-600 grid size-9 place-items-center rounded-xl">
          <Icon name={icon} className="size-4" />
        </span>
        <h2 id={`${id}-heading`} className="text-xl font-black tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
