'use client';

import { useEffect, useRef, useState } from 'react';

import { Icon, Spinner } from '@/components/atoms';
import { useToastStore } from '@/store/toast-store';

const LOADING_MS = 1200;

type DownloadButtonProps = { href: string; fileName: string; title: string };

/** Plain `<a download>` (works without JS); adds a loading state + toast on top. */
export function DownloadButton({ href, fileName, title }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const push = useToastStore((state) => state.push);
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = () => {
    setLoading(true);
    push('دانلود فایل آغاز شد');
    timer.current = window.setTimeout(() => setLoading(false), LOADING_MS);
  };

  return (
    <a
      href={href}
      download={fileName}
      onClick={onClick}
      aria-busy={loading}
      aria-label={`دانلود ${title}`}
      className="border-hairline hover:border-brand-500 hover:text-brand-600 focus-visible:ring-brand-500 flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
    >
      {loading ? (
        <Spinner className="size-4" />
      ) : (
        <Icon name="arrowStart" className="size-4 -rotate-90" />
      )}
      <span className="hidden sm:inline">دانلود</span>
    </a>
  );
}
