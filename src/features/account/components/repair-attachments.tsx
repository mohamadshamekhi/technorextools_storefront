import Image from 'next/image';

import { Icon } from '@/components/atoms';
import type { RepairAttachment } from '@/features/repairs';

/** Files the customer uploaded with the request — images preview, anything else links out. */
export function RepairAttachments({ attachments }: { attachments: RepairAttachment[] }) {
  if (attachments.length === 0) return null;

  return (
    <section className="border-hairline bg-surface rounded-2xl border p-4 shadow-sm">
      <h2 className="text-[13.5px] font-bold">فایل‌های پیوست</h2>
      <ul className="mt-3 flex flex-wrap gap-3">
        {attachments.map((file) => (
          <li key={file.id}>
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="border-hairline hover:border-brand-500/40 focus-visible:ring-brand-500 block overflow-hidden rounded-xl border transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {file.contentType.startsWith('image/') ? (
                <Image
                  src={file.url}
                  alt={file.originalName ?? 'پیوست درخواست تعمیر'}
                  width={96}
                  height={96}
                  className="size-24 object-cover"
                />
              ) : (
                <span className="text-foreground-muted grid size-24 place-items-center gap-1 p-2 text-center text-[11px]">
                  <Icon name="doc" className="size-5" />
                  {file.originalName ?? 'دانلود فایل'}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
