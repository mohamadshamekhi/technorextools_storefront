'use client';

import { useRouter } from 'next/navigation';
import { useTransition, type FormEvent } from 'react';

import { Icon, Spinner } from '@/components/atoms';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

/**
 * GET search bar for the parts catalogue — stays a real `<form action>` so it
 * works (and is crawlable) without JS; JS intercepts submit for a soft nav so
 * the page never does a full reload.
 */
export function SparePartsSearchForm({ q, inStock }: { q?: string; inStock?: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const search = new URLSearchParams();
    const query = String(data.get('q') ?? '').trim();
    if (query) search.set('q', query);
    if (data.get('inStock')) search.set('inStock', 'true');
    const href = search.toString() ? `${routes.spareParts}?${search}` : routes.spareParts;
    startTransition(() => router.replace(href, { scroll: false }));
  };

  return (
    <form
      action={routes.spareParts}
      onSubmit={onSubmit}
      role="search"
      className="mx-auto mt-8 max-w-xl"
    >
      <div className="bg-surface flex items-center gap-2 rounded-2xl p-2 shadow-(--shadow-float) ring-1 ring-white/20">
        <label htmlFor="sp-q" className="sr-only">
          جستجوی قطعه
        </label>
        <Icon name="search" className="text-foreground-muted mr-2 size-5 shrink-0" />
        <input
          id="sp-q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="نام قطعه یا شماره فنی، مثلاً ۲۲۲"
          className="text-foreground placeholder:text-foreground-muted min-h-11 min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <button
          type="submit"
          aria-busy={pending}
          className={cn(
            'bg-brand-500 flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-(image:--gradient-brand) px-5 text-sm font-bold text-white shadow-(--shadow-brand) transition-[filter,transform,opacity] duration-200 hover:brightness-110 active:scale-95',
            pending && 'pointer-events-none opacity-70',
          )}
        >
          {pending ? <Spinner className="size-4" /> : null}
          جستجو
        </button>
      </div>
      <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-white/70 transition-colors has-checked:text-white">
        <input
          type="checkbox"
          name="inStock"
          value="true"
          defaultChecked={inStock}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className="peer-checked:bg-accent-500 peer-checked:ring-accent-500 peer-focus-visible:outline-accent-400 grid size-5 place-items-center rounded-md bg-white/10 ring-1 ring-white/25 transition-colors peer-checked:*:opacity-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
        >
          <Icon name="check" className="text-ink size-3.5 opacity-0 transition-opacity" />
        </span>
        فقط قطعات موجود
      </label>
    </form>
  );
}
