import styles from './hero.module.css';

export function HeroBadge() {
  return (
    <p className="bg-surface inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] font-bold shadow-(--shadow-soft) ring-1 ring-hairline">
      <span className="relative flex size-2.5 items-center justify-center" aria-hidden>
        <span className={`${styles.dot} bg-brand-500/40 absolute inset-0 rounded-full`} />
        <span className="bg-brand-500 relative size-1.5 rounded-full" />
      </span>
      نمایندگی رسمی پوما ایر در ایران
      <span className="bg-accent-500 mr-1 rounded-full px-1.5 py-0.5 text-[10px] font-black text-ink">
        رسمی
      </span>
    </p>
  );
}
