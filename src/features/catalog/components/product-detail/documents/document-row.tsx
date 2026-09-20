import { Icon, type IconName } from '@/components/atoms';
import { formatJalaliDate } from '@/features/content/utils/date';
import { toPersianDigits } from '@/lib/persian';

import type { ProductDocument, DownloadableDocument } from '../../../types/pdp';
import { DownloadButton } from './download-button';

const ICONS: Record<ProductDocument['type'], IconName> = {
  catalog: 'doc',
  manual: 'list',
  datasheet: 'gauge',
  certificate: 'award',
};

function formatSize(sizeKb: number): string {
  return sizeKb >= 1024
    ? `${toPersianDigits((sizeKb / 1024).toFixed(1))} مگابایت`
    : `${toPersianDigits(sizeKb)} کیلوبایت`;
}

export function DocumentRow({ doc }: { doc: DownloadableDocument }) {
  const extension = doc.url.split('.').pop() ?? 'pdf';

  return (
    <li className="flex items-center gap-4 py-3">
      <span className="bg-surface-muted text-brand-600 grid size-11 shrink-0 place-items-center rounded-xl">
        <Icon name={ICONS[doc.type]} className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-bold">{doc.title}</p>
        <p className="text-foreground-muted mt-0.5 text-xs">
          {extension.toUpperCase()} · {formatSize(doc.sizeKb)} ·{' '}
          {doc.locale === 'fa' ? 'فارسی' : 'English'} · بروزرسانی {formatJalaliDate(doc.updatedAt)}
        </p>
      </div>
      <DownloadButton href={doc.href} fileName={`${doc.id}.${extension}`} title={doc.title} />
    </li>
  );
}
