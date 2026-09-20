import { Icon } from '@/components/atoms';

import styles from './hero.module.css';

export function HeroBadge() {
  return (
    <p className="bg-surface ring-hairline inline-flex w-fit items-center gap-2.5 rounded-full py-1.5 ps-1.5 pe-4 text-[13px] font-bold shadow-(--shadow-soft) ring-1">
      <span className="bg-brand-50 text-brand-600 grid size-7 shrink-0 place-items-center rounded-full">
        <Icon name="shield" className="size-3.5" />
      </span>
      نمایندگی رسمی تکنورکس در ایران
      <span className="relative flex size-2 items-center justify-center" aria-hidden>
        <span className={`${styles.dot} bg-accent-500/40 absolute inset-0 rounded-full`} />
        <span className="bg-accent-500 relative size-1.5 rounded-full" />
      </span>
    </p>
  );
}
