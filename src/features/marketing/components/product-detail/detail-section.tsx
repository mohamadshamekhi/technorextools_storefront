import type { ReactNode } from 'react';

import { Icon, type IconName } from '@/components/atoms';

type DetailSectionProps = {
  id: string;
  title: string;
  icon: IconName;
  /** OKLCH background for the icon chip. */
  tint: string;
  ink: string;
  children: ReactNode;
};

/** Titled block on the product page — an icon chip + `h2`, anchor-scroll safe. */
export function DetailSection({ id, title, icon, tint, ink, children }: DetailSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-32 pt-14">
      <div className="mb-5 flex items-center gap-3">
        <span
          className="grid size-9 place-items-center rounded-xl"
          style={{ backgroundColor: tint, color: ink }}
        >
          <Icon name={icon} className="size-4" />
        </span>
        <h2 id={`${id}-heading`} className="text-2xl font-black tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
