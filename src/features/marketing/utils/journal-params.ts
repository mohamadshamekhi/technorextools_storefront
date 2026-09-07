import { z } from 'zod';

import { FEATURED_SLUG, JOURNAL_ARTICLES } from '../data/journal';
import type { JournalArticle } from '../types';

/** Raw `?cat=` query — validated, never trusted raw. */
export const journalParamsSchema = z.object({
  cat: z.enum(['guides', 'maintenance', 'news', 'safety', 'comparisons']).optional(),
});

export type JournalQuery = z.infer<typeof journalParamsSchema>;

/**
 * Articles for the index grid, newest first, excluding the pinned
 * featured post and optionally narrowed to one category.
 */
export function toJournalList(cat?: JournalQuery['cat']): JournalArticle[] {
  return JOURNAL_ARTICLES.filter(
    (article) => article.slug !== FEATURED_SLUG && (!cat || article.categorySlug === cat),
  );
}
