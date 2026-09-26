'use client';

import { useId, useRef, useState, type ChangeEvent, type DragEvent } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { AttachmentsController } from '../hooks/use-attachments';
import { UPLOAD_ACCEPT_ATTR } from '../types';
import { AttachmentTile } from './attachment-tile';

type AttachmentPickerProps = {
  label: string;
  hint?: string;
  controller: AttachmentsController;
};

/** Drag-and-drop zone with an equivalent click/keyboard file input (WCAG 2.2 dragging). */
export function AttachmentPicker({ label, hint, controller }: AttachmentPickerProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const full = controller.items.length >= controller.max;

  const handleFiles = (list: FileList | null) => {
    if (list && list.length) controller.add(Array.from(list));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = '';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!full) handleFiles(event.dataTransfer.files);
  };

  return (
    <div className="mt-4">
      <label htmlFor={inputId} className="mb-2 block text-[13px] font-bold">
        {label}
      </label>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'rounded-2xl border border-dashed p-4 text-center transition-colors',
          dragging ? 'border-brand-500 bg-brand-50' : 'border-hairline bg-surface-muted',
          full && 'opacity-60',
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept={UPLOAD_ACCEPT_ATTR}
          disabled={full}
          onChange={handleChange}
          className="sr-only"
        />
        <Icon name="plus" className="text-brand-500 mx-auto size-5" />
        <p className="text-foreground-muted mt-2 text-xs font-semibold">
          فایل را اینجا رها کنید یا
        </p>
        <button
          type="button"
          disabled={full}
          onClick={() => inputRef.current?.click()}
          className="text-brand-600 hover:bg-brand-50 mt-1.5 min-h-11 rounded-xl px-4 text-[13px] font-black transition-colors disabled:cursor-not-allowed"
        >
          انتخاب فایل
        </button>
        {hint ? <p className="text-foreground-muted mt-1 text-[11px]">{hint}</p> : null}
      </div>

      {controller.rejection ? (
        <p role="alert" className="text-sale mt-1.5 text-xs font-semibold">
          {controller.rejection}
        </p>
      ) : null}

      {controller.items.length ? (
        <ul className="mt-3 grid gap-2">
          {controller.items.map((item) => (
            <AttachmentTile key={item.localId} item={item} onRemove={controller.remove} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
