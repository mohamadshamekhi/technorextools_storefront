import type { Metadata } from 'next';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';
import { SparePartGrid, sparePartsQuerySchema } from '@/features/spare-parts';
import { listSpareParts } from '@/features/spare-parts/services/spare-parts.api';
import { breadcrumbSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

type Search = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export async function generateMetadata({
  searchParams,
}: PageProps<Record<string, never>, Search>): Promise<Metadata> {
  const raw = await searchParams;
  return buildMetadata({
    title: 'قطعات یدکی ابزار صنعتی',
    description: 'خرید قطعات یدکی اصل ابزار بادی و شارژی تکنورکس با شماره فنی و سازگاری مشخص.',
    path: routes.spareParts,
    noindex: Object.keys(raw).length > 0,
  });
}

export default async function SparePartsPage({
  searchParams,
}: PageProps<Record<string, never>, Search>) {
  const raw = await searchParams;
  const parsed = sparePartsQuerySchema.safeParse({
    q: first(raw.q),
    productSlug: first(raw.productSlug),
    inStock: first(raw.inStock),
  });
  const result = await listSpareParts(parsed.success ? parsed.data : {}).catch(() => null);
  const structuredData = breadcrumbSchema([
    { name: 'خانه', path: routes.home },
    { name: 'قطعات یدکی', path: routes.spareParts },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container className="py-10">
        <h1 className="mb-2 text-2xl font-black sm:text-3xl">قطعات یدکی</h1>
        <form action={routes.spareParts} className="mb-8 flex max-w-lg gap-2" role="search">
          <label htmlFor="sp-q" className="sr-only">
            جستجوی قطعه
          </label>
          <input
            id="sp-q"
            name="q"
            defaultValue={parsed.success ? parsed.data.q : undefined}
            placeholder="نام یا شماره قطعه"
            className="border-hairline bg-surface min-h-11 flex-1 rounded-xl border px-4 text-sm"
          />
          <button
            type="submit"
            className="bg-brand-500 min-h-11 rounded-xl px-5 text-sm font-bold text-white"
          >
            جستجو
          </button>
        </form>
        {result && result.items.length > 0 ? (
          <SparePartGrid parts={result.items} />
        ) : (
          <p className="text-foreground-muted py-16 text-center">قطعه‌ای یافت نشد.</p>
        )}
      </Container>
    </>
  );
}
