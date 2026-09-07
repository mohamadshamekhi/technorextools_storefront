/**
 * Marketing / storefront public surface.
 * Server-only modules (`*.actions.ts`) are imported directly by path,
 * never re-exported here — see CLAUDE.md barrel hygiene.
 */
export { StoreHeader } from './components/store-header';
export { StoreFooter } from './components/footer/store-footer';

export { Hero } from './components/hero/hero';
export { CategoryRail } from './components/category-rail/category-rail';
export { FlashDeals } from './components/flash-deals/flash-deals';
export { PromoCards } from './components/promo-cards/promo-cards';
export { ProductShowcase } from './components/products/product-showcase';
export { PromoTicker } from './components/promo-ticker';
export { ValueProps } from './components/value-props/value-props';
export { AboutSection } from './components/about/about-section';
export { AboutHero } from './components/about-page/about-hero';
export { MissionSection } from './components/about-page/mission-section';
export { AboutStatsBand } from './components/about-page/stats-band';
export { TimelineSection } from './components/about-page/timeline-section';
export { AboutValuesSection } from './components/about-page/values-section';
export { TeamSection } from './components/about-page/team-section';
export { AboutCta } from './components/about-page/about-cta';
export { FaqSection } from './components/about-page/faq-section';
export { Testimonials } from './components/testimonials/testimonials';
export { BrandStrip } from './components/brand-strip';
export { NewsletterCta } from './components/newsletter-cta';
export { JournalSection } from './components/journal/journal-section';

export { CatalogHero } from './components/catalog/catalog-hero';
export { ProductCatalog } from './components/catalog/product-catalog';
export { CategoryHero } from './components/category/category-hero';
export { CategoryLanding } from './components/category/category-landing';
export { ProductDetailView } from './components/product-detail/product-detail-view';

export { JournalHero } from './components/journal-page/journal-hero';
export {
  FeaturedArticle,
  JournalList,
  TrendingStrip,
} from './components/journal-page/journal-sections';

export { PRODUCTS } from './data/catalog';
export { CATEGORIES } from './data/categories';
export { JOURNAL_ARTICLES, FEATURED_SLUG, AUTHOR_NAME } from './data/journal';
export { JOURNAL_CATEGORIES, JOURNAL_TRENDING } from './data/journal-taxonomy';
export type { Product, Category, JournalArticle, JournalCategory } from './types';
export { toCatalogState, catalogParamsSchema, hasActiveFilters } from './utils/catalog-params';
export { journalParamsSchema, toJournalList } from './utils/journal-params';
export { findProduct, relatedProducts, getProductDetail } from './utils/product-detail';
export { findCategory, stockedCategories, categoryProductCount } from './utils/category';
export { findArticle, relatedArticles } from './utils/journal-detail';
