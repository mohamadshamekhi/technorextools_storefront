import Image from 'next/image';
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
      className={cn('flex items-center gap-1', className)}
      aria-label={`${siteConfig.name} — صفحه اصلی`}
    >
      <span aria-hidden>
        <Image src="/logo.svg" alt="" width={950} height={382} priority className="h-7 w-auto" />
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
