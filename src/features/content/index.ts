/**
 * Content domain — client-safe surface only. `JournalRail` and
 * `services/content.api.ts` are imported by direct path from RSC / route
 * handlers, never through this barrel (barrel hygiene).
 */
export { ArticleCard } from './components/article-card';
export { ArticleBody } from './components/article-body';
export { JournalHero } from './components/journal-hero';
export { FeaturedArticle } from './components/featured-article';
export { formatJalaliDate } from './utils/date';
export { firstImageFromHtml } from './utils/cover';
export type { ArticleCardData, ArticleDetail, ArticleList } from './types';
