import { Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';
import { toPersianDigits } from '@/lib/persian';

import type { DownloadableDocument } from '../../../types/pdp';

const linkClass =
  'text-brand-600 hover:text-brand-700 focus-visible:ring-brand-500 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none';

export function SupportLinks({ catalog }: { catalog: DownloadableDocument | null }) {
  return (
    <div className="flex flex-col">
      <a href={`tel:${siteConfig.phoneHref}`} className={linkClass}>
        <Icon name="headset" className="size-4" />
        مشاوره تلفنی <bdi>{siteConfig.phone}</bdi>
      </a>
      {catalog ? (
        <a href={catalog.href} download className={linkClass}>
          <Icon name="doc" className="size-4" />
          دانلود کاتالوگ (PDF · {toPersianDigits((catalog.sizeKb / 1024).toFixed(1))}MB)
        </a>
      ) : null}
    </div>
  );
}
