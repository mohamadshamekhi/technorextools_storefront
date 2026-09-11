import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';
import {
  CategoryHero,
  findCategoryNode,
  flattenCategories,
  hasActiveFilters,
  parseCatalogParams,
} from '@/features/catalog';
import { CatalogView } from '@/features/catalog/components/catalog-view';
import { getCategoryTree, listProducts } from '@/features/catalog/services/catalog.api';
import { PromoTicker } from '@/features/marketing';
import { breadcrumbSchema, itemListSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

type CategoryParams = { slug: string };
type CategorySearch = Record<string, string | string[] | undefined>;

export async function generateStaticParams(): Promise<CategoryParams[]> {
  const tree = await getCategoryTree().catch(() => []);
  return flattenCategories(tree).map((node) => ({ slug: node.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<CategoryParams, CategorySearch>): Promise<Metadata> {
  const { slug } = await params;
  const tree = await getCategoryTree().catch(() => []);
  const category = findCategoryNode(tree, slug);
  if (!category) return buildMetadata({ title: 'دسته‌بندی یافت نشد', noindex: true });

  const filters = parseCatalogParams(await searchParams);
  return buildMetadata({
    title: `خرید ${category.title} صنعتی | پوما ایر`,
    description: `مجموعه ${category.title} پوما ایر با گارانتی اصالت و ارسال سریع.`,
    path: routes.category(slug),
    noindex: hasActiveFilters({ ...filters, category: undefined }),
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<CategoryParams, CategorySearch>) {
  const { slug } = await params;
  const filters = parseCatalogParams(await searchParams);
  const tree = await getCategoryTree().catch(() => []);
  const category = findCategoryNode(tree, slug);
  if (!category) notFound();

  const result = await listProducts(filters, { category: slug }).catch(() => null);

  const structuredData = [
    breadcrumbSchema([
      { name: 'خانه', path: routes.home },
      { name: 'همه محصولات', path: routes.products },
      { name: category.title, path: routes.category(slug) },
    ]),
    ...(result
      ? [
          itemListSchema(
            `${category.title} پوما ایر`,
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
        <CategoryHero title={category.title} slug={slug} count={result?.total ?? 0} />
      </Container>
      <PromoTicker />
      <Container className="py-10">
        <CatalogView params={filters} lockedCategory={slug} />
      </Container>
    </>
  );
}
