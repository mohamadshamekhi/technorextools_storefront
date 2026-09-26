'use client';

import { useRouter } from 'next/navigation';
import { useTransition, type FormEvent } from 'react';

import { Icon, Spinner } from '@/components/atoms';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

/**
 * GET form → `/search?q=`. Stays a real `<form action method="get">` so it works
 * without JS and matches the SearchAction schema; JS intercepts submit for a soft
 * navigation instead of a full page reload.
 */
export function HeaderSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get('q') ?? '').trim();
    if (!q) return;
    startTransition(() => router.push(`${routes.search}?q=${encodeURIComponent(q)}`));
  };

  return (
    <form
      action={routes.search}
      method="get"
      onSubmit={onSubmit}
      role="search"
      className={cn(
        'bg-surface-sunken border-hairline focus-within:border-brand-400 focus-within:bg-surface focus-within:ring-brand-500/12 flex items-center gap-2.5 rounded-2xl border px-4 transition-[background-color,border-color,box-shadow] focus-within:ring-4',
        className,
      )}
    >
      {pending ? (
        <Spinner className="text-brand-500 size-[17px]" />
      ) : (
        <Icon name="search" className="text-brand-500 size-[17px]" />
      )}
      <input
        type="search"
        name="q"
        placeholder="جست‌وجو در ۳۵۰ مدل ابزار بادی و شارژی…"
        aria-label="جست‌وجوی محصولات"
        className="text-foreground placeholder:text-foreground-muted h-11 w-full bg-transparent text-sm outline-none"
      />
    </form>
  );
}
