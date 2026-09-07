import { MediaPlaceholder } from '@/components/atoms';

import { HeroFloatingCard } from './hero-floating-card';
import styles from './hero.module.css';

/** Hero art column: product shot, orbit ring, two floating spec chips. */
export function HeroShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className={styles.ring} aria-hidden />
      <MediaPlaceholder
        label="تصویر شاخص محصول (بکس بادی)"
        className="border-hairline aspect-square rounded-[1.75rem] border shadow-2xl"
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
