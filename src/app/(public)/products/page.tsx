import type { Metadata } from 'next';

import { Container } from '@/components/atoms';
import {
  catalogParamsSchema,
  CatalogHero,
  hasActiveFilters,
  ProductCatalog,
  PRODUCTS,
  PromoTicker,
  toCatalogState,
} from '@/features/marketing';
import { breadcrumbSchema, itemListSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import { routes } from '@/config/routes';
import type { PageProps } from '@/types';

type CatalogSearch = Record<string, string | string[] | undefined>;

function parse(searchParams: CatalogSearch) {
  const result = catalogParamsSchema.safeParse(searchParams);
  return toCatalogState(result.success ? result.data : catalogParamsSchema.parse({}));
}

export async function generateMetadata({
  searchParams,
}: PageProps<Record<string, never>, CatalogSearch>): Promise<Metadata> {
  const { filters } = parse(await searchParams);
  return buildMetadata({
    title: 'فروشگاه ابزار بادی و شارژی صنعتی',
    description:
      'خرید ابزار بادی و شارژی صنعتی پوما ایر با گارانتی اصالت؛ فیلتر بر اساس دسته‌بندی، برند، قیمت و امتیاز مشتریان.',
    path: routes.products,
    noindex: hasActiveFilters(filters),
  });
}

const structuredData = [
  breadcrumbSchema([
    { name: 'خانه', path: routes.home },
    { name: 'همه محصولات', path: routes.products },
  ]),
  itemListSchema(
    'محصولات پوما ایر',
    PRODUCTS.map((product) => ({ name: product.title, price: product.price })),
  ),
];

export default async function ProductsPage({
  searchParams,
}: PageProps<Record<string, never>, CatalogSearch>) {
  const initial = parse(await searchParams);

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
        <ProductCatalog initial={initial} />
      </Container>
    </>
  );
}
