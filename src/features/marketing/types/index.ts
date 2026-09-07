import type { IconName } from '@/components/atoms';

/** A shop department shown in the icon rail. */
export type Category = {
  slug: string;
  title: string;
  icon: IconName;
  /** OKLCH tint pair for the icon chip. */
  tint: string;
  ink: string;
  /** One-line summary shown on the category landing hero (SEO copy). */
  description: string;
};

/** Catalogue item. Prices are integers in toman. */
export type Product = {
  id: string;
  title: string;
  /** Slug from `CATEGORIES` — drives the catalog department filter. */
  categorySlug: string;
  /** Coarse bucket the home-page tabs switch on. */
  group: ProductGroup;
  brand: string;
  usage: ProductUsage;
  price: number;
  compareAt: number | null;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  badge?: { label: string; tone: 'brand' | 'success' | 'sale' };
};

export type ProductGroup = 'air' | 'cordless' | 'accessory';
export type ProductUsage = 'industrial' | 'home';

export type Deal = Pick<Product, 'id' | 'title' | 'price'> & { compareAt: number };

export type PromoCard = {
  title: string;
  description: string;
  cta: string;
  tint: string;
  ink: string;
};

/** Compact benefit line used in strips. */
export type ValueProp = {
  icon: IconName;
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export type Article = {
  slug: string;
  title: string;
  date: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: NavItem[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

/** One milestone on the about-page company timeline. */
export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

/** A team member portrait on the about page. */
export type TeamMember = {
  name: string;
  role: string;
};

/** Journal article category — drives the blog filter tabs and tag chips. */
export type JournalCategory = {
  slug: string;
  label: string;
  icon: IconName;
  /** Tailwind color pair for the tag chip (full literal classes). */
  chip: string;
  ink: string;
};

/** A journal article in the blog index / detail pages. */
export type JournalArticle = {
  slug: string;
  title: string;
  categorySlug: string;
  date: string;
  /** Reading time in minutes. */
  readTime: number;
  excerpt: string;
};

/** One content block of an article body. */
export type ArticleBlock = { h?: string; p?: string };
