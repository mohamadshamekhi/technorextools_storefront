/**
 * Marketing / storefront public surface — static, non-data-driven sections only.
 * Catalog & journal now live in `@/features/catalog` and `@/features/content`.
 */
export { StoreHeader } from './components/store-header';
export { StoreFooter } from './components/footer/store-footer';

export { Hero } from './components/hero/hero';
export { PromoCards } from './components/promo-cards/promo-cards';
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
export { NewsletterCta } from './components/newsletter-cta';

export type {
  PromoCard,
  ValueProp,
  Testimonial,
  NavItem,
  FooterColumn,
  SocialLink,
  TimelineEntry,
  TeamMember,
} from './types';
