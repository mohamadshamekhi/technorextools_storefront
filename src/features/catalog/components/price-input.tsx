'use client';

type PriceInputProps = {
  label: string;
  value: string;
  onChange: (raw: string) => void;
};

/** Boxed toman field with a caption above the value; parsing back to digits is the caller's job. */
export function PriceInput({ label, value, onChange }: PriceInputProps) {
  return (
    <label className="border-hairline bg-surface focus-within:border-brand-400 focus-within:ring-brand-100 flex min-w-0 flex-1 flex-col gap-0.5 rounded-xl border px-3 py-2 transition focus-within:ring-3">
      <span className="text-foreground-muted text-[11px] font-semibold">{label}</span>
      <input
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        placeholder="—"
        dir="ltr"
        className="placeholder:text-foreground-muted w-full min-w-0 bg-transparent text-end text-[13px] font-black tabular-nums outline-none"
      />
    </label>
  );
}
