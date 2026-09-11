'use client';

import { Spinner } from '@/components/atoms';

type CouponFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  pending?: boolean;
};

export function CouponField({ value, onChange, onApply, pending = false }: CouponFieldProps) {
  return (
    <div className="mb-3 flex gap-2.5">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="کد تخفیف"
        dir="ltr"
        disabled={pending}
        className="border-hairline focus:border-brand-500 focus:ring-brand-500/15 flex-1 rounded-lg border px-3.5 py-2.5 text-center text-[13.5px] outline-none transition-colors focus:ring-2 disabled:opacity-60"
      />
      <button
        type="button"
        onClick={onApply}
        disabled={pending}
        className="bg-surface-sunken border-hairline hover:border-brand-500 flex items-center justify-center gap-1.5 rounded-lg border px-4.5 text-[13px] font-bold transition-colors disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? <Spinner className="size-3.5" /> : 'اعمال'}
      </button>
    </div>
  );
}
