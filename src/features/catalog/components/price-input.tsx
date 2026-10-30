'use client';

type PriceInputProps = {
  /** Short visible prefix inside the field (`از` / `تا`). */
  label: string;
  ariaLabel: string;
  value: string;
  onChange: (raw: string) => void;
};

/** Grouped-digit toman field; parsing back to digits is the caller's job. */
export function PriceInput({ label, ariaLabel, value, onChange }: PriceInputProps) {
  return (
    <label className="border-hairline bg-surface focus-within:border-brand-400 focus-within:ring-brand-100 flex h-10 min-w-0 flex-1 items-center gap-1.5 rounded-xl border px-2.5 transition-colors focus-within:ring-2">
      <span className="text-foreground-muted w-5 shrink-0 text-[12px]">{label}</span>
      <input
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
        placeholder="۰"
        dir="ltr"
        className="placeholder:text-foreground-muted/60 w-full min-w-0 bg-transparent text-end text-[13px] font-bold tabular-nums outline-none"
      />
      <span className="text-foreground-muted shrink-0 text-[11px]">تومان</span>
    </label>
  );
}
