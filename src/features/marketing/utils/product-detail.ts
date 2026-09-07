import { PRODUCTS } from '../data/catalog';
import type { Product } from '../types';
import type { ProductDetail, RatingBar, SpecRow } from '../types/product-detail';
import {
  COLOR_OPTIONS,
  DEFAULT_MODELS,
  GALLERY_LABELS,
  HIGHLIGHTS,
  MODELS_BY_CATEGORY,
  PRODUCT_FAQS,
  REVIEW_POOL,
  SPEC_TEMPLATES,
} from '../data/product-details';

/** A plausible star-distribution weighted toward the average rating. */
export function ratingBars(rating: number): RatingBar[] {
  const five = Math.min(92, Math.max(45, Math.round((rating - 3.8) * 70 + 40)));
  const four = Math.round((100 - five) * 0.55);
  const three = Math.round((100 - five - four) * 0.6);
  const two = Math.round((100 - five - four - three) * 0.6);
  const one = Math.max(0, 100 - five - four - three - two);
  return [
    { stars: 5, percent: five },
    { stars: 4, percent: four },
    { stars: 3, percent: three },
    { stars: 2, percent: two },
    { stars: 1, percent: one },
  ];
}

/** Look up a catalogue product by its slug (id). */
export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === slug);
}

/** Same-category products first, then the rest — capped at `limit`. */
export function relatedProducts(product: Product, limit = 4): Product[] {
  const others = PRODUCTS.filter((item) => item.id !== product.id);
  const sameCategory = others.filter((item) => item.categorySlug === product.categorySlug);
  const rest = others.filter((item) => item.categorySlug !== product.categorySlug);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Compose the mock detail view for a catalogue product. */
export function getProductDetail(product: Product): ProductDetail {
  const specs = SPEC_TEMPLATES[product.group];
  const keySpecs = [0, specs.length - 3, specs.length - 2, specs.length - 1]
    .map((index) => specs[index])
    .filter((row): row is SpecRow => row !== undefined);
  return {
    gallery: GALLERY_LABELS,
    keySpecs,
    colors: COLOR_OPTIONS,
    models: MODELS_BY_CATEGORY[product.categorySlug] ?? DEFAULT_MODELS,
    highlights: HIGHLIGHTS[product.group],
    specs,
    reviews: REVIEW_POOL,
    ratingBars: ratingBars(product.rating),
    faqs: PRODUCT_FAQS,
  };
}
