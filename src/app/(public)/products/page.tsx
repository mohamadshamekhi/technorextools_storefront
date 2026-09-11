import type { Metadata } from 'next';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';
import { CatalogHero, hasActiveFilters, parseCatalogParams } from '@/features/catalog';
import { CatalogView } from '@/features/catalog/components/catalog-view';
import { listProducts } from '@/features/catalog/services/catalog.api';
import { PromoTicker } from '@/features/marketing';
import { breadcrumbSchema, itemListSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

type CatalogSearch = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  searchParams,
}: PageProps<Record<string, never>, CatalogSearch>): Promise<Metadata> {
  const params = parseCatalogParams(await searchParams);
  return buildMetadata({
    title: 'فروشگاه ابزار بادی و شارژی صنعتی',
    description:
      'خرید ابزار بادی و شارژی صنعتی تکنورکس با گارانتی اصالت؛ فیلتر بر اساس دسته‌بندی، برند و قیمت.',
    path: routes.products,
    noindex: hasActiveFilters(params),
  });
}

export default async function ProductsPage({
  searchParams,
}: PageProps<Record<string, never>, CatalogSearch>) {
  const params = parseCatalogParams(await searchParams);
  const result = await listProducts(params).catch(() => null);
  const structuredData = [
    breadcrumbSchema([
      { name: 'خانه', path: routes.home },
      { name: 'همه محصولات', path: routes.products },
    ]),
    ...(result
      ? [
          itemListSchema(
            'محصولات تکنورکس',
            result.items.map((product) => ({
              name: product.title,
              url: routes.product(product.slug),
              price: product.basePrice,
            })),
          ),
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container className="pt-8">
        <CatalogHero />
      </Container>
      <PromoTicker />
      <Container className="py-10">
        <CatalogView params={params} />
      </Container>
    </>
  );
}
