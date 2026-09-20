'use client';

import { useEffect } from 'react';

import { Button } from '@/components/atoms';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="text-sale grid size-16 place-items-center rounded-2xl bg-[oklch(0.95_0.04_25)] text-3xl font-black">
        !
      </span>
      <h1 className="text-2xl font-black tracking-tight">مشکلی پیش آمد</h1>
      <p className="text-foreground-muted text-sm leading-loose text-pretty">
        خطای غیرمنتظره‌ای رخ داد. تیم فنی در جریان قرار گرفت. می‌توانید دوباره تلاش کنید.
      </p>
      <Button onClick={reset}>تلاش دوباره</Button>
    </main>
  );
}
