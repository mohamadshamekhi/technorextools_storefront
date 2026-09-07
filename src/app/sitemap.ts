import type { MetadataRoute } from 'next';

import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { PRODUCTS } from '@/features/marketing/data/catalog';
import { JOURNAL_ARTICLES } from '@/features/marketing/data/journal';
import { stockedCategories } from '@/features/marketing/utils/category';
import { absoluteUrl } from '@/lib/utils';

type Entry = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' };

/**
 * Dynamic sitemap. Product slugs come from the mock catalogue for now —
 * swap `PRODUCTS` for a fetch from `abzar/api` when it is wired.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: Entry[] = [
    { path: routes.home, priority: 1, changeFrequency: 'weekly' },
    { path: routes.products, priority: 0.9, changeFrequency: 'weekly' },
    { path: routes.about, priority: 0.7, changeFrequency: 'monthly' },
    { path: routes.contact, priority: 0.5, changeFrequency: 'monthly' },
    { path: routes.blog, priority: 0.8, changeFrequency: 'weekly' },
    { path: routes.orderTracking, priority: 0.4, changeFrequency: 'monthly' },
    ...stockedCategories().map(
      (category): Entry => ({
        path: routes.category(category.slug),
        priority: 0.85,
        changeFrequency: 'weekly',
      }),
    ),
    ...PRODUCTS.map(
      (product): Entry => ({
        path: routes.product(product.id),
        priority: 0.8,
        changeFrequency: 'weekly',
      }),
    ),
    ...JOURNAL_ARTICLES.map(
      (article): Entry => ({
        path: routes.blogPost(article.slug),
        priority: 0.6,
        changeFrequency: 'monthly',
      }),
    ),
  ];

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path, siteConfig.url),
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
