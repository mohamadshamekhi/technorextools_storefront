'use client';

import { Icon, Spinner } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { Attachment } from '../types';

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} مگابایت`
    : `${Math.max(1, Math.round(bytes / 1024))} کیلوبایت`;

type AttachmentTileProps = {
  item: Attachment;
  onRemove: (localId: string) => void;
};

/** One picked file: thumbnail (or doc glyph), name/size, upload state, remove button. */
export function AttachmentTile({ item, onRemove }: AttachmentTileProps) {
  return (
    <li
      className={cn(
        'border-hairline bg-surface relative flex items-center gap-3 rounded-2xl border p-2.5',
        item.status === 'error' && 'border-sale bg-sale/5',
      )}
    >
      <span className="bg-surface-sunken relative size-14 shrink-0 overflow-hidden rounded-xl">
        {item.previewUrl ? (
          // Runtime-only object URL — cannot be expressed as a Tailwind token.
          <span
            aria-hidden
            style={{ backgroundImage: `url(${item.previewUrl})` }}
            className="absolute inset-0 bg-cover bg-center"
          />
        ) : (
          <Icon
            name="doc"
            className="text-foreground-muted absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2"
          />
        )}
        {item.status === 'uploading' ? (
          <span className="absolute inset-0 grid place-items-center bg-white/70">
            <Spinner className="size-5" />
          </span>
        ) : null}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-bold">{item.name}</span>
        <span
          className={cn(
            'text-foreground-muted mt-0.5 block text-[11px] font-semibold',
            item.status === 'error' && 'text-sale',
          )}
        >
          {item.status === 'error'
            ? (item.error ?? 'بارگذاری ناموفق بود')
            : item.status === 'uploading'
              ? 'در حال بارگذاری…'
              : formatSize(item.size)}
        </span>
      </span>

      <button
        type="button"
        onClick={() => onRemove(item.localId)}
        aria-label={`حذف ${item.name}`}
        className="text-foreground-muted hover:text-sale hover:bg-sale/10 grid size-11 shrink-0 place-items-center rounded-xl transition-colors"
      >
        <Icon name="close" className="size-4" />
      </button>
    </li>
  );
}
