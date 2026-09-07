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
        className="bg-brand-500 font-display text-surface grid size-10 place-items-center rounded-[0.8rem] text-xl font-bold"
      >
        P
      </span>
      <span className={cn('text-xl font-extrabold', tone === 'dark' && 'text-surface')}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
