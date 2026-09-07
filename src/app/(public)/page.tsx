import type { Metadata } from 'next';

import {
  AboutSection,
  BrandStrip,
  CategoryRail,
  FlashDeals,
  Hero,
  JournalSection,
  NewsletterCta,
  ProductShowcase,
  PRODUCTS,
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

const structuredData = [
  websiteSchema(),
  localBusinessSchema(),
  itemListSchema(
    'پرفروش‌ترین ابزارهای پوما ایر',
    PRODUCTS.map((product) => ({ name: product.title, price: product.price })),
  ),
];

export default function HomePage() {
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
      <JournalSection />
    </>
  );
}
