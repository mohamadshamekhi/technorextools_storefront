import type { Metadata } from 'next';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';
import {
  SparePartGrid,
  SparePartsEmpty,
  SparePartsHero,
  SparePartsToolbar,
  sparePartsQuerySchema,
} from '@/features/spare-parts';
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
  const query = parsed.success ? parsed.data : {};
  const inStock = query.inStock === 'true';
  const parts = result?.items ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container className="pt-6 pb-14 sm:pt-8">
        <SparePartsHero q={query.q} inStock={inStock} />
        <section className="mt-10">
          {parts.length > 0 ? (
            <>
              <SparePartsToolbar count={parts.length} q={query.q} inStock={inStock} />
              <SparePartGrid parts={parts} />
            </>
          ) : (
            <SparePartsEmpty q={query.q} failed={result === null} />
          )}
        </section>
      </Container>
    </>
  );
}
