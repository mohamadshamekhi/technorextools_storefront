'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ACCEPTED_UPLOAD_TYPES, MAX_UPLOAD_BYTES, type Attachment } from '../types';

const ACCEPTED: readonly string[] = ACCEPTED_UPLOAD_TYPES;

function validate(file: File): string | null {
  if (!ACCEPTED.includes(file.type)) return 'فرمت فایل پشتیبانی نمی‌شود';
  if (file.size > MAX_UPLOAD_BYTES) return 'حجم فایل بیشتر از ۱۰ مگابایت است';
  return null;
}

/** Owns picked files and their upload to the `/api/media/upload` BFF. */
export function useAttachments(max = 5) {
  const [items, setItems] = useState<Attachment[]>([]);
  const [rejection, setRejection] = useState<string | null>(null);
  const previews = useRef<string[]>([]);

  useEffect(
    () => () => {
      previews.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  const upload = useCallback(async (localId: string, file: File) => {
    const body = new FormData();
    body.append('file', file);
    try {
      const res = await fetch('/api/media/upload', { method: 'POST', body });
      const payload = (await res.json().catch(() => null)) as {
        id?: string;
        error?: string;
      } | null;
      if (!res.ok || !payload?.id) {
        const error = payload?.error ?? 'بارگذاری ناموفق بود';
        setItems((prev) =>
          prev.map((item) =>
            item.localId === localId ? { ...item, status: 'error', error } : item,
          ),
        );
        return;
      }
      const mediaId = payload.id;
      setItems((prev) =>
        prev.map((item) =>
          item.localId === localId ? { ...item, status: 'done', mediaId } : item,
        ),
      );
    } catch {
      setItems((prev) =>
        prev.map((item) =>
          item.localId === localId
            ? { ...item, status: 'error', error: 'ارتباط با سرور برقرار نشد' }
            : item,
        ),
      );
    }
  }, []);

  const add = useCallback(
    (files: readonly File[]) => {
      const room = max - items.length;
      if (room <= 0) {
        setRejection(`حداکثر ${max} فایل می‌توانید ضمیمه کنید`);
        return;
      }

      let notice: string | null =
        files.length > room ? `حداکثر ${max} فایل می‌توانید ضمیمه کنید` : null;
      const next: Attachment[] = [];
      files.slice(0, room).forEach((file, index) => {
        const invalid = validate(file);
        if (invalid) {
          notice = invalid;
          return;
        }
        const localId = `${file.size}-${Date.now()}-${index}-${next.length}`;
        const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
        if (previewUrl) previews.current.push(previewUrl);
        next.push({ localId, name: file.name, size: file.size, previewUrl, status: 'uploading' });
        void upload(localId, file);
      });

      setRejection(notice);
      if (next.length) setItems((prev) => [...prev, ...next]);
    },
    [items.length, max, upload],
  );

  const remove = useCallback((localId: string) => {
    setRejection(null);
    setItems((prev) => {
      const target = prev.find((item) => item.localId === localId);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
        previews.current = previews.current.filter((url) => url !== target.previewUrl);
      }
      return prev.filter((item) => item.localId !== localId);
    });
  }, []);

  const reset = useCallback(() => {
    previews.current.forEach((url) => URL.revokeObjectURL(url));
    previews.current = [];
    setItems([]);
    setRejection(null);
  }, []);

  return {
    items,
    rejection,
    add,
    remove,
    reset,
    max,
    uploading: items.some((item) => item.status === 'uploading'),
    mediaIds: items.flatMap((item) => (item.mediaId ? [item.mediaId] : [])),
  };
}

export type AttachmentsController = ReturnType<typeof useAttachments>;
