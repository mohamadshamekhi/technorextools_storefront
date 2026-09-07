import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { routes } from '@/config/routes';
import {
  findProduct,
  ProductDetailView,
  PRODUCTS,
  relatedProducts,
} from '@/features/marketing';
import { breadcrumbSchema, productSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

type ProductParams = { slug: string };

export function generateStaticParams(): ProductParams[] {
  return PRODUCTS.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({
  params,
}: PageProps<ProductParams>): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return buildMetadata({ title: 'محصول یافت نشد', noindex: true });

  return buildMetadata({
    title: `${product.title} | ${product.brand}`,
    description: product.description,
    path: routes.product(slug),
  });
}

export default async function ProductDetailPage({ params }: PageProps<ProductParams>) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const structuredData = [
    breadcrumbSchema([
      { name: 'خانه', path: routes.home },
      { name: 'همه محصولات', path: routes.products },
      { name: product.title, path: routes.product(slug) },
    ]),
    productSchema({
      name: product.title,
      description: product.description,
      sku: product.id,
      brand: product.brand,
      price: product.price,
      path: routes.product(slug),
      inStock: product.inStock,
      rating: product.rating,
      reviewCount: product.reviews,
    }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-generated structured data — XSS-safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetailView product={product} related={relatedProducts(product)} />
    </>
  );
}
