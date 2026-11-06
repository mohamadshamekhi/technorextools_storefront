import type { HeroSlide } from '../../types';
import { HeroFloatingCard } from './hero-floating-card';
import styles from './hero.module.css';

/** One slot per spec — position, float speed, accent, badge corner. Kept to the top half so the caption stays clear. */
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
    pos: 'end-2 top-[38%] sm:end-[-1.25rem]',
    anim: styles.floatSlow,
    accent: 'text-brand-600',
    badgeSide: 'start',
  },
] as const;

/** Floating spec chips for the active slide; re-keyed per slide so they re-enter. */
export function HeroSlideSpecs({ specs }: { specs: HeroSlide['specs'] }) {
  return specs.map((spec, i) => {
    const slot = SLOTS[i];
    if (!slot) return null;
    return (
      <HeroFloatingCard
        key={spec.label}
        value={spec.value}
        label={spec.label}
        accent={slot.accent}
        badgeSide={slot.badgeSide}
        className={`z-[60] ${slot.anim} ${slot.pos}`}
        delayMs={150 + i * 120}
      />
    );
  });
}
