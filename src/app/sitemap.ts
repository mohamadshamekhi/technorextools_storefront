import type { MetadataRoute } from 'next';

import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { flattenCategories } from '@/features/catalog';
import { getCategoryTree, listProducts } from '@/features/catalog/services/catalog.api';
import { listArticles } from '@/features/content/services/content.api';
import { absoluteUrl } from '@/lib/utils';

type Entry = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' };

/** Dynamic sitemap — slugs come from `abzar/api`. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [tree, products, articles] = await Promise.all([
    getCategoryTree().catch(() => []),
    listProducts({ sort: 'newest' }, { take: 100 }).catch(() => null),
    listArticles({ take: 100 }).catch(() => null),
  ]);

  const entries: Entry[] = [
    { path: routes.home, priority: 1, changeFrequency: 'weekly' },
    { path: routes.products, priority: 0.9, changeFrequency: 'weekly' },
    { path: routes.about, priority: 0.7, changeFrequency: 'monthly' },
    { path: routes.contact, priority: 0.5, changeFrequency: 'monthly' },
    { path: routes.blog, priority: 0.8, changeFrequency: 'weekly' },
    { path: routes.orderTracking, priority: 0.4, changeFrequency: 'monthly' },
    ...flattenCategories(tree).map(
      (category): Entry => ({
        path: routes.category(category.slug),
        priority: 0.85,
        changeFrequency: 'weekly',
      }),
    ),
    ...(products?.items ?? []).map(
      (product): Entry => ({
        path: routes.product(product.slug),
        priority: 0.8,
        changeFrequency: 'weekly',
      }),
    ),
    ...(articles?.items ?? []).map(
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
