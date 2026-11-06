import { routes } from '@/config/routes';
import type { ProductDetail } from '@/features/catalog';

import { HERO_SHOWCASE_FALLBACK } from '../../data/content';
import type { HeroSlide } from '../../types';
import { HeroProductGrid } from './hero-product-grid';

type HeroShowcaseProps = {
  /** Up to 4 `isFeatured` products from `abzar/api`; empty shows the static fallback slide. */
  products: ProductDetail[];
};

const MAX_SPECS = 3;

const FALLBACK_SLIDE: HeroSlide = {
  key: 'fallback',
  title: HERO_SHOWCASE_FALLBACK.label,
  eyebrow: null,
  price: null,
  href: null,
  image: undefined,
  specs: [
    { value: HERO_SHOWCASE_FALLBACK.torque, label: 'گشتاور خروجی' },
    { value: HERO_SHOWCASE_FALLBACK.warranty, label: 'گارانتی رسمی' },
  ],
};

function toSlide(product: ProductDetail): HeroSlide {
  const mainImage = product.images.find((img) => img.isMain) ?? product.images[0];
  return {
    key: product.id,
    title: product.title,
    eyebrow: product.brand?.title ?? product.category.title,
    price: product.basePrice > 0 ? product.basePrice : null,
    href: routes.product(product.slug),
    image: mainImage?.url,
    specs: product.attributeValues.slice(0, MAX_SPECS).map((attr) => ({
      value: `${attr.value}${attr.unit ? ` ${attr.unit}` : ''}`,
      label: attr.attributeTitle,
    })),
  };
}

/** Hero art column: maps featured products to slides; grid lays them out. */
export function HeroShowcase({ products }: HeroShowcaseProps) {
  const slides = products.length > 0 ? products.map(toSlide) : [FALLBACK_SLIDE];
  return <HeroProductGrid slides={slides} />;
}
