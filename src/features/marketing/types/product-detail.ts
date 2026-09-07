import type { IconName } from '@/components/atoms';

/** One labelled figure in the spec table / key-spec chips. */
export type SpecRow = { icon: IconName; label: string; value: string };

/** A single question/answer in the product FAQ accordion. */
export type Faq = { question: string; answer: string };

/** A customer review shown under the product. */
export type ProductReview = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

/** One bar in the rating-distribution histogram. */
export type RatingBar = { stars: number; percent: number };

/** A selectable colour swatch. */
export type ColorOption = { label: string; swatch: string };

/**
 * The extended, page-only view of a product — everything the detail page
 * needs beyond the catalogue card. Generated as mock data for now.
 */
export type ProductDetail = {
  /** Placeholder labels standing in for gallery photos. */
  gallery: string[];
  /** Compact chips shown in the buy box. */
  keySpecs: SpecRow[];
  colors: ColorOption[];
  models: string[];
  /** Short selling points listed beside the description. */
  highlights: string[];
  /** Full specification table. */
  specs: SpecRow[];
  reviews: ProductReview[];
  ratingBars: RatingBar[];
  faqs: Faq[];
};
