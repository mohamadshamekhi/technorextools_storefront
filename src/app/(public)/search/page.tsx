import type { Metadata } from 'next';
import Link from 'next/link';
import { z } from 'zod';

import { Container, Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

export const metadata: Metadata = buildMetadata({
  title: 'جست‌وجو',
  path: '/search',
  noindex: true,
});

const querySchema = z.object({ q: z.string().trim().max(120).optional() });

export default async function SearchPage({
  searchParams,
}: PageProps<Record<string, never>, { q?: string }>) {
  const { q } = querySchema.parse(await searchParams);

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-xl text-center">
        <span className="bg-brand-50 text-brand-600 ring-brand-100 mx-auto grid size-14 place-items-center rounded-2xl ring-1">
          <Icon name="search" className="size-7" />
        </span>
        <h1 className="mt-5 text-2xl font-black tracking-tight">جست‌وجوی محصولات</h1>
        <p className="text-foreground-muted mt-3 text-sm leading-loose">
          {q
            ? `نتیجه‌ای برای «${q}» یافت نشد. عبارت دیگری را امتحان کنید.`
            : 'عبارت مورد نظر را جست‌وجو کنید.'}
        </p>
        <form action="/search" method="get" role="search" className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            aria-label="جست‌وجوی محصولات"
            placeholder="مثلاً: بکس بادی"
            className="border-hairline bg-surface focus-visible:ring-brand-500/20 focus-visible:border-brand-400 h-11 w-full rounded-xl border px-4 text-sm shadow-(--shadow-soft) outline-none focus-visible:ring-4"
          />
          <button
            type="submit"
            className="bg-brand-500 bg-(image:--gradient-brand) shrink-0 rounded-xl px-5 text-sm font-bold text-white shadow-(--shadow-brand)"
          >
            جست‌وجو
          </button>
        </form>
        <Link href={routes.products} className="text-brand-600 mt-5 inline-block text-[13px] font-bold">
          مشاهدهٔ همهٔ محصولات
        </Link>
      </div>
    </Container>
  );
}
