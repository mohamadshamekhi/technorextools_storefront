import { MediaPlaceholder } from '@/components/atoms';

import { PRODUCT_SHOT } from '../../data/media';
import { HeroFloatingCard } from './hero-floating-card';
import styles from './hero.module.css';

/** Hero art column: product shot, orbit ring, two floating spec chips. */
export function HeroShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-6 -z-10 rounded-full bg-(image:--gradient-brand) opacity-25 blur-3xl"
      />
      <div className={styles.ring} aria-hidden />
      <MediaPlaceholder
        label="پیچ‌گوشتی بادی تکنورکس"
        src={PRODUCT_SHOT}
        priority
        sizes="(max-width: 1024px) 90vw, 45vw"
        className="aspect-square rounded-[2rem] shadow-(--shadow-float) ring-1 ring-hairline"
      />
      <HeroFloatingCard
        icon="bolt"
        value="۱۲۰۰ Nm"
        label="گشتاور خروجی"
        accent="text-brand-600"
        className={`${styles.floatSlow} start-[-1.5rem] top-[8%]`}
      />
      <HeroFloatingCard
        icon="shield"
        value="۱۸ ماه"
        label="گارانتی رسمی"
        accent="text-info"
        className={`${styles.floatFast} end-[-1.5rem] bottom-[10%]`}
      />
    </div>
  );
}
