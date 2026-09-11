import 'server-only';

import { apiClient } from '@/lib/api-client';

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
