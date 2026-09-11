'use client';

import { Icon } from '@/components/atoms';

type AddressEmptyStateProps = { onAddAddress: () => void };

/** Shown when the customer has no saved addresses yet. */
export function AddressEmptyState({ onAddAddress }: AddressEmptyStateProps) {
  return (
    <div className="border-hairline bg-surface-muted/60 mb-4.5 flex flex-col items-center gap-4 rounded-2xl border border-dashed px-6 py-10 text-center">
      <div className="bg-brand-50 relative grid size-16 place-items-center rounded-full">
        <Icon name="pin" className="text-brand-500 size-7" />
        <span className="border-surface bg-brand-500 absolute -end-1 -top-1 grid size-6 place-items-center rounded-full border-2">
          <Icon name="plus" className="size-3 text-white" />
        </span>
      </div>
      <div className="max-w-[280px]">
        <p className="mb-1.5 text-[15px] font-black">هنوز آدرسی ثبت نکرده‌اید</p>
        <p className="text-foreground-muted text-[13px] leading-relaxed">
          برای ارسال سفارش، اولین آدرس تحویل خود را اضافه کنید.
        </p>
      </div>
      <button
        type="button"
        onClick={onAddAddress}
        className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2 rounded-xl px-5 py-3 text-[13.5px] font-bold text-white transition-colors hover:-translate-y-0.5"
      >
        <Icon name="plus" className="size-4" />
        افزودن آدرس جدید
      </button>
    </div>
  );
}
