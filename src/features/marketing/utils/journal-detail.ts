import { JOURNAL_ARTICLES } from '../data/journal';
import type { JournalArticle } from '../types';

/** Locate one article by slug (or undefined → caller 404s). */
export function findArticle(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((article) => article.slug === slug);
}

/** Same-category neighbours, newest first, capped to `limit`. */
export function relatedArticles(article: JournalArticle, limit: number): JournalArticle[] {
  const sameCategory = JOURNAL_ARTICLES.filter(
    (item) => item.slug !== article.slug && item.categorySlug === article.categorySlug,
  );
  const fallback = JOURNAL_ARTICLES.filter(
    (item) => item.slug !== article.slug && item.categorySlug !== article.categorySlug,
  );
  return [...sameCategory, ...fallback].slice(0, limit);
}
