import Link from 'next/link';

import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

type BrandLogoProps = {
  /** `dark` inverts the wordmark for use on the ink footer. */
  tone?: 'default' | 'dark';
  className?: string;
};

export function BrandLogo({ tone = 'default', className }: BrandLogoProps) {
  return (
    <Link
      href={routes.home}
      className={cn('flex items-center gap-2.5', className)}
      aria-label={`${siteConfig.name} — صفحه اصلی`}
    >
      <span
        aria-hidden
        className="bg-brand-500 bg-(image:--gradient-brand) font-display text-surface relative grid size-10 place-items-center rounded-xl text-xl font-black shadow-(--shadow-brand)"
      >
        P
        <span className="bg-accent-500 absolute -end-1 -top-1 size-2.5 rounded-full ring-2 ring-surface" />
      </span>
      <span
        className={cn(
          'text-xl font-black tracking-tight',
          tone === 'dark' ? 'text-surface' : 'text-foreground',
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
