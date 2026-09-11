import type { Metadata } from 'next';
import Link from 'next/link';
import { z } from 'zod';

import { Container, Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { ProductGrid } from '@/features/catalog';
import { listProducts } from '@/features/catalog/services/catalog.api';
import { toPersianDigits } from '@/lib/persian';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

export const metadata: Metadata = buildMetadata({
  title: 'جست‌وجو',
  path: '/search',
  noindex: true,
});

const querySchema = z.object({ q: z.string().trim().min(1).max(120).optional() });

export default async function SearchPage({
  searchParams,
}: PageProps<Record<string, never>, { q?: string }>) {
  const { q } = querySchema.parse(await searchParams);
  const result = q ? await listProducts({ q, sort: 'newest' }, { take: 24 }).catch(() => null) : null;

  return (
    <Container className="py-16">
      <form action="/search" method="get" role="search" className="mx-auto flex max-w-md gap-2">
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

      {q ? (
        <p className="text-foreground-muted mt-8 text-center text-sm">
          {result && result.total > 0
            ? `${toPersianDigits(result.total)} نتیجه برای «${q}»`
            : `نتیجه‌ای برای «${q}» یافت نشد.`}
        </p>
      ) : (
        <p className="text-foreground-muted mt-8 flex items-center justify-center gap-2 text-sm">
          <Icon name="search" className="size-4" />
          عبارت مورد نظر را جست‌وجو کنید.
        </p>
      )}

      {result && result.items.length > 0 ? (
        <div className="mt-8">
          <ProductGrid products={result.items} />
        </div>
      ) : null}

      <div className="mt-10 text-center">
        <Link href={routes.products} className="text-brand-600 text-[13px] font-bold">
          مشاهدهٔ همهٔ محصولات
        </Link>
      </div>
    </Container>
  );
}
