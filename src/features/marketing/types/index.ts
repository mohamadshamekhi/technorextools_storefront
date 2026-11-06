import type { IconName } from '@/components/atoms';

export type PromoCard = {
  title: string;
  description: string;
  cta: string;
  icon: IconName;
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

/** One hero carousel slide — mapped server-side from an `isFeatured` product. */
export type HeroSlide = {
  key: string;
  title: string;
  /** Brand, else category — the small line above the title. */
  eyebrow: string | null;
  price: number | null;
  href: string | null;
  image: string | undefined;
  specs: Array<{ value: string; label: string }>;
};
