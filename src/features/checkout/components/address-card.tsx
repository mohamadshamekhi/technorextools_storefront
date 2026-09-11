'use client';

import { cn } from '@/lib/utils';

import type { Address } from '../types';

type AddressCardProps = { address: Address; selected: boolean; onSelect: () => void };

export function AddressCard({ address, selected, onSelect }: AddressCardProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] p-4 transition-colors',
        selected ? 'border-brand-500 bg-brand-50' : 'border-hairline bg-surface',
      )}
    >
      <input
        type="radio"
        name="checkout-address"
        checked={selected}
        onChange={onSelect}
        className="accent-brand-500 mt-0.5 size-4"
      />
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[14px] font-bold">{address.receiverName}</span>
          {address.isDefault ? (
            <span className="bg-brand-50 text-brand-600 rounded-full px-2.5 py-0.5 text-[11px] font-bold">
              پیش‌فرض
            </span>
          ) : null}
        </div>
        <p className="text-foreground-muted text-[13px] leading-loose">
          {address.province}، {address.city}، {address.fullAddress}
        </p>
        <p dir="ltr" className="text-foreground-muted mt-1 text-right text-[12px]">
          {address.receiverMobile}
        </p>
      </div>
    </label>
  );
}
