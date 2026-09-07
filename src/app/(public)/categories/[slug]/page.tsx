import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';
import {
  catalogParamsSchema,
  CategoryHero,
  CategoryLanding,
  categoryProductCount,
  findCategory,
  hasActiveFilters,
  PRODUCTS,
  PromoTicker,
  stockedCategories,
  toCatalogState,
} from '@/features/marketing';
import { breadcrumbSchema, itemListSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

type CategoryParams = { slug: string };
type CategorySearch = Record<string, string | string[] | undefined>;

export function generateStaticParams(): CategoryParams[] {
  return stockedCategories().map((category) => ({ slug: category.slug }));
}

function parse(slug: string, searchParams: CategorySearch) {
  const result = catalogParamsSchema.safeParse(searchParams);
  const state = toCatalogState(result.success ? result.data : catalogParamsSchema.parse({}));
  return { ...state, filters: { ...state.filters, categories: [slug] } };
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<CategoryParams, CategorySearch>): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) return buildMetadata({ title: 'دسته‌بندی یافت نشد', noindex: true });

  const { filters } = parse(slug, await searchParams);
  return buildMetadata({
    title: `خرید ${category.title} صنعتی | پوما ایر`,
    description: category.description,
    path: routes.category(slug),
    noindex: hasActiveFilters({ ...filters, categories: [] }),
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<CategoryParams, CategorySearch>) {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const initial = parse(slug, await searchParams);
  const count = categoryProductCount(slug);
  const stocked = stockedCategories();
  const siblings = stocked.some((c) => c.slug === slug) ? stocked : [...stocked, category];

  const structuredData = [
    breadcrumbSchema([
      { name: 'خانه', path: routes.home },
      { name: 'همه محصولات', path: routes.products },
      { name: category.title, path: routes.category(slug) },
    ]),
    itemListSchema(
      `${category.title} پوما ایر`,
      PRODUCTS.filter((product) => product.categorySlug === slug).map((product) => ({
        name: product.title,
        url: routes.product(product.id),
        price: product.price,
      })),
    ),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container className="pt-8">
        <CategoryHero category={category} count={count} />
      </Container>
      <PromoTicker />
      <Container className="py-10">
        <CategoryLanding category={category} siblings={siblings} initial={initial} />
      </Container>
    </>
  );
}
