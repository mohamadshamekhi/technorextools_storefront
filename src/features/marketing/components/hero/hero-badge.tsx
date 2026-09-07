import styles from './hero.module.css';

export function HeroBadge() {
  return (
    <p className="bg-surface border-hairline inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13px] font-bold shadow-sm">
      <span className={`${styles.dot} bg-brand-500 size-2 rounded-full`} aria-hidden />
      نمایندگی رسمی پوما ایر در ایران
    </p>
  );
}
