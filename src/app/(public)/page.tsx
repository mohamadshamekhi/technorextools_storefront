import type { Metadata } from 'next';

import { BrandStrip } from '@/features/catalog/components/brand-strip';
import { CategoryRail } from '@/features/catalog/components/category-rail';
import { FlashDeals } from '@/features/catalog/components/flash-deals';
import { ProductShowcase } from '@/features/catalog/components/product-showcase';
import { listProducts } from '@/features/catalog/services/catalog.api';
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
  const featured = await listProducts({ sort: 'newest' }, { take: 8 }).catch(() => null);

  const structuredData = [
    websiteSchema(),
    localBusinessSchema(),
    ...(featured
      ? [
          itemListSchema(
            'جدیدترین ابزارهای پوما ایر',
            featured.items.map((product) => ({ name: product.title, price: product.basePrice })),
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
      <Hero />
      <CategoryRail />
      <FlashDeals />
      <PromoCards />
      <ProductShowcase />
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
