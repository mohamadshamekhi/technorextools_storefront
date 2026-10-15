import { MediaPlaceholder } from '@/components/atoms';
import type { ProductDetail } from '@/features/catalog';

import { HERO_SHOWCASE_FALLBACK } from '../../data/content';
import { HeroFloatingCard } from './hero-floating-card';
import styles from './hero.module.css';

type HeroShowcaseProps = {
  /** The `isFeatured` product from `abzar/api`, or `null` when none is set. */
  product: ProductDetail | null;
};

type Spec = { value: string; label: string };

const MAX_SPECS = 3;

const FALLBACK_SPECS: Spec[] = [
  { value: HERO_SHOWCASE_FALLBACK.torque, label: 'گشتاور خروجی' },
  { value: HERO_SHOWCASE_FALLBACK.warranty, label: 'گارانتی رسمی' },
];

/** One slot per spec — position, float speed, accent color, badge corner: kept sparse (3) so the art stays clean. */
const SLOTS = [
  {
    pos: 'start-2 top-6 sm:start-[-1rem]',
    anim: styles.floatSlow,
    accent: 'text-brand-600',
    badgeSide: 'end',
  },
  {
    pos: 'end-2 top-6 sm:end-[-1rem]',
    anim: styles.floatFast,
    accent: 'text-info',
    badgeSide: 'start',
  },
  {
    pos: 'end-2 bottom-8 sm:end-[-0.5rem]',
    anim: styles.floatSlow,
    accent: 'text-brand-600',
    badgeSide: 'start',
  },
] as const;

/** Hero art column: featured-product shot, orbit ring, up to 3 sparse floating spec cards. */
export function HeroShowcase({ product }: HeroShowcaseProps) {
  const mainImage = product?.images.find((img) => img.isMain) ?? product?.images[0];
  const label = product?.title ?? HERO_SHOWCASE_FALLBACK.label;

  const specs: Spec[] =
    product && product.attributeValues.length > 0
      ? product.attributeValues.slice(0, MAX_SPECS).map((attr) => ({
          value: `${attr.value}${attr.unit ? ` ${attr.unit}` : ''}`,
          label: attr.attributeTitle,
        }))
      : FALLBACK_SPECS;

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-6 -z-10 rounded-full bg-(image:--gradient-brand) opacity-[0.14] blur-3xl"
      />
      <div className={styles.ring} aria-hidden />
      <div className={styles.ground} aria-hidden />
      <MediaPlaceholder
        label={label}
        src={mainImage?.url}
        priority
        sizes="(max-width: 1024px) 90vw, 45vw"
        className={`ring-hairline aspect-square rounded-4xl shadow-(--shadow-float) ring-1 ${styles.artIn}`}
      />
      {specs.map((spec, i) => {
        const slot = SLOTS[i % SLOTS.length];
        if (!slot) return null;
        return (
          <HeroFloatingCard
            key={spec.label}
            value={spec.value}
            label={spec.label}
            accent={slot.accent}
            badgeSide={slot.badgeSide}
            className={`${slot.anim} ${slot.pos}`}
            delayMs={550 + i * 150}
          />
        );
      })}
    </div>
  );
}
