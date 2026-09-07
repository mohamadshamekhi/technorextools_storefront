'use client';

type CouponFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
};

export function CouponField({ value, onChange, onApply }: CouponFieldProps) {
  return (
    <div className="mb-3 flex gap-2.5">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="کد تخفیف"
        dir="ltr"
        className="border-hairline focus:border-brand-500 focus:ring-brand-500/15 flex-1 rounded-lg border px-3.5 py-2.5 text-center text-[13.5px] outline-none transition-colors focus:ring-2"
      />
      <button
        type="button"
        onClick={onApply}
        className="bg-surface-sunken border-hairline hover:border-brand-500 rounded-lg border px-4.5 text-[13px] font-bold transition-colors"
      >
        اعمال
      </button>
    </div>
  );
}
