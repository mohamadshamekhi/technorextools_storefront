import type { ReactNode } from 'react';

import { Icon, type IconName } from '@/components/atoms';

type StepHeadingProps = {
  icon: IconName;
  tint: string;
  ink: string;
  title: string;
  children: ReactNode;
};

/** Tinted icon chip + headline + supporting copy, shared by every step. */
export function StepHeading({ icon, tint, ink, title, children }: StepHeadingProps) {
  return (
    <div className="mb-6">
      <span
        className="mb-5 flex size-13 items-center justify-center rounded-2xl"
        style={{ backgroundColor: tint, color: ink }}
      >
        <Icon name={icon} className="size-6" />
      </span>
      <h1 className="text-[1.4rem] font-black tracking-tight">{title}</h1>
      <p className="text-foreground-muted mt-2 text-[13px] leading-loose">{children}</p>
    </div>
  );
}
