import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';
import { ProductDetailView } from '@/features/catalog';
import {
  getProduct,
  getProductComments,
  listProducts,
} from '@/features/catalog/services/catalog.api';
import { buildExtras, buildSpecs, withDownloadHrefs } from '@/features/catalog/utils/pdp-extras';
import { toDescriptionHtml } from '@/features/catalog/utils/description-html';
import { listSpareParts } from '@/features/spare-parts/services/spare-parts.api';
import { ApiError } from '@/lib/api-client';
import { breadcrumbSchema, productSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

type ProductParams = { slug: string };

export const dynamicParams = true;

export async function generateStaticParams(): Promise<ProductParams[]> {
  const result = await listProducts({ sort: 'newest' }, { take: 100 }).catch(() => null);
  return (result?.items ?? []).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<ProductParams>): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    return buildMetadata({
      title: `${product.title}${product.brand ? ` | ${product.brand.title}` : ''}`,
      description: product.shortDesc ?? product.description ?? product.title,
      path: routes.product(slug),
    });
  } catch {
    return buildMetadata({ title: 'محصول یافت نشد', noindex: true });
  }
}

export default async function ProductDetailPage({ params }: PageProps<ProductParams>) {
  const { slug } = await params;

  let product;
  try {
    product = await getProduct(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const comments = await getProductComments(slug, { take: 10 }).catch(() => ({
    items: [],
    total: 0,
    skip: 0,
    take: 10,
    averageRating: null,
  }));

  const spareParts = await listSpareParts({ productSlug: slug, take: 12 })
    .then((result) => result.items)
    .catch(() => []);

  const extras = buildExtras(product);
  const documents = withDownloadHrefs(extras.documents, slug);
  const specs = buildSpecs(product);
  const descriptionHtml = toDescriptionHtml(product.description);

  const structuredData = [
    breadcrumbSchema([
      { name: 'خانه', path: routes.home },
      { name: 'همه محصولات', path: routes.products },
      { name: product.title, path: routes.product(slug) },
    ]),
    productSchema({
      name: product.title,
      description: product.shortDesc ?? product.description ?? product.title,
      sku: product.variants[0]?.sku ?? product.id,
      brand: product.brand?.title ?? 'تکنورکس',
      price: product.basePrice,
      path: routes.product(slug),
      inStock:
        product.variants.some((variant) => variant.stockQty > 0) || product.variants.length === 0,
      rating: comments.averageRating ?? 0,
      reviewCount: comments.total,
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetailView
        product={product}
        comments={comments}
        extras={extras}
        documents={documents}
        specs={specs}
        descriptionHtml={descriptionHtml}
        spareParts={spareParts}
      />
    </>
  );
}
