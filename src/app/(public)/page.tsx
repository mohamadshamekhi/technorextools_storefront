import type { Metadata } from 'next';
import { Suspense } from 'react';

import { BrandStrip } from '@/features/catalog/components/brand-strip';
import { CategoryRail } from '@/features/catalog/components/category-rail';
import { FlashDeals } from '@/features/catalog/components/flash-deals';
import { ProductShowcase } from '@/features/catalog/components/product-showcase';
import { ProductShowcaseSkeleton } from '@/features/catalog/components/product-showcase-skeleton';
import { getFeaturedProduct, listProducts } from '@/features/catalog/services/catalog.api';
import { cardPurchase } from '@/features/catalog/utils/card-variant';
import { JournalRail } from '@/features/content/components/journal-rail';
import {
  AboutSection,
  Hero,
  NewsletterCta,
  PromoCards,
  PromoTicker,
  Testimonials,
  ValueProps,
} from '@/features/marketing';
import { itemListSchema, localBusinessSchema, websiteSchema } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'فروش ابزار بادی و شارژی صنعتی با گارانتی اصالت',
  path: '/',
});

export const revalidate = 300;

export default async function HomePage() {
  const [featured, featuredProduct] = await Promise.all([
    listProducts({ sort: 'newest' }, { take: 8 }).catch(() => null),
    getFeaturedProduct().catch(() => null),
  ]);

  const structuredData = [
    websiteSchema(),
    localBusinessSchema(),
    ...(featured
      ? [
          itemListSchema(
            'جدیدترین ابزارهای تکنورکس',
            featured.items.map((product) => ({
              name: product.title,
              price: cardPurchase(product).price,
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
      <Hero featuredProduct={featuredProduct} />
      <CategoryRail />
      <FlashDeals />
      <PromoCards />
      <Suspense fallback={<ProductShowcaseSkeleton />}>
        <ProductShowcase />
      </Suspense>
      <PromoTicker />
      <ValueProps />
      <AboutSection />
      <Testimonials />
      <BrandStrip />
      <NewsletterCta />
      <JournalRail />
    </>
  );
}
