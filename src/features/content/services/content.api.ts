import 'server-only';

import { apiClient } from '@/lib/api-client';

import { firstImageFromHtml } from '../utils/cover';
import { articleDetailSchema, articleListSchema } from './content.schemas';

const BASE = '/storefront/content';
const revalidate = 300;

export function listArticles(opts: { page?: number; take?: number } = {}) {
  const take = opts.take ?? 12;
  const page = opts.page ?? 1;
  const search = new URLSearchParams({ take: String(take), skip: String((page - 1) * take) });
  return apiClient.get(`${BASE}/articles?${search.toString()}`, articleListSchema, {
    auth: false,
    next: { revalidate, tags: ['content:articles'] },
  });
}

export function getArticle(slug: string) {
  return apiClient.get(`${BASE}/articles/${encodeURIComponent(slug)}`, articleDetailSchema, {
    auth: false,
    next: { revalidate, tags: [`content:article:${slug}`] },
  });
}

/**
 * `listArticles` with the body-image cover fallback applied (see
 * `utils/cover.ts`). Costs one extra cached request per article that has no
 * `COVER` media row; drop it once the admin panel always uploads a cover.
 */
export async function listArticlesWithCovers(opts: { page?: number; take?: number } = {}) {
  const result = await listArticles(opts);
  const items = await Promise.all(
    result.items.map(async (article) => {
      if (article.coverImage) return article;
      const detail = await getArticle(article.slug).catch(() => null);
      return { ...article, coverImage: firstImageFromHtml(detail?.body) };
    }),
  );
  return { ...result, items };
}
