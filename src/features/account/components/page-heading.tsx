import type { ReactNode } from 'react';

type PageHeadingProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

/** Shared title block for every account page. */
export function PageHeading({ title, subtitle, action }: PageHeadingProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-black tracking-tight sm:text-[1.35rem]">{title}</h1>
        {subtitle ? (
          <p className="text-foreground-muted mt-1 text-[13px]">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
