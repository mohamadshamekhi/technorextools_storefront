import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/utils';

type Thing = Record<string, unknown> & { '@type': string };

/** Wrap a schema.org node with the required context. */
export function jsonLd<T extends Thing>(node: T) {
  return { '@context': 'https://schema.org', ...node } as const;
}

const sameAs = Object.values(siteConfig.links);

export function organizationSchema() {
  return jsonLd({
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl('/logo.png', siteConfig.url),
    email: siteConfig.email,
    sameAs,
  });
}

/** Home-page search box + brand identity for the SERP. */
export function websiteSchema() {
  return jsonLd({
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'fa-IR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={query}`,
      'query-input': 'required name=query',
    },
  });
}

/** Physical retail presence — powers the local knowledge panel. */
export function localBusinessSchema() {
  return jsonLd({
    '@type': 'HardwareStore',
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phoneHref,
    email: siteConfig.email,
    address: { '@type': 'PostalAddress', addressCountry: 'IR', streetAddress: siteConfig.address },
    priceRange: '$$',
    sameAs,
  });
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return jsonLd({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteConfig.url),
    })),
  });
}

/** Ordered product rail — helps Google build a merchant carousel. */
export function itemListSchema(
  name: string,
  items: Array<{ name: string; url?: string; price?: number }>,
) {
  return jsonLd({
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { url: absoluteUrl(item.url, siteConfig.url) } : {}),
    })),
  });
}

/** Rich product result — powers price, rating and availability in Google. */
export function productSchema(input: {
  name: string;
  description: string;
  sku: string;
  brand: string;
  price: number;
  path: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  image?: string;
}) {
  return jsonLd({
    '@type': 'Product',
    name: input.name,
    description: input.description,
    sku: input.sku,
    brand: { '@type': 'Brand', name: input.brand },
    image: absoluteUrl(input.image ?? siteConfig.ogImage, siteConfig.url),
    offers: {
      '@type': 'Offer',
      price: input.price,
      priceCurrency: 'IRR',
      availability: input.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: absoluteUrl(input.path, siteConfig.url),
      seller: { '@type': 'Organization', name: siteConfig.name },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: input.rating,
      reviewCount: input.reviewCount,
      bestRating: 5,
    },
  });
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  return jsonLd({
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    image: input.image ? absoluteUrl(input.image, siteConfig.url) : undefined,
    mainEntityOfPage: absoluteUrl(input.path, siteConfig.url),
    publisher: { '@type': 'Organization', name: siteConfig.name },
  });
}

/** Q&A pairs — eligible for the expandable FAQ rich result in Google. */
export function faqSchema(questions: Array<{ question: string; answer: string }>) {
  return jsonLd({
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  });
}
