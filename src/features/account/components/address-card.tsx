'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import type { Address } from '@/features/checkout';

const iconButton =
  'border-hairline bg-surface hover:text-brand-600 grid size-8 place-items-center rounded-lg border transition-colors disabled:opacity-50';

type AddressCardProps = {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  deleting: boolean;
};

export function AddressCard({ address, onEdit, onDelete, deleting }: AddressCardProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="border-hairline bg-surface rounded-2xl border p-5 shadow-sm">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold">{address.receiverName}</span>
          {address.isDefault ? (
            <span className="bg-brand-50 text-brand-600 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold">
              پیش‌فرض
            </span>
          ) : null}
        </div>
        <div className="flex gap-1.5">
          <button type="button" aria-label="ویرایش آدرس" className={iconButton} onClick={onEdit}>
            <Icon name="pencil" className="text-foreground-muted size-3.5" />
          </button>
          <button
            type="button"
            aria-label={confirming ? 'تأیید حذف آدرس' : 'حذف آدرس'}
            className={iconButton}
            disabled={deleting}
            onClick={() => (confirming ? onDelete() : setConfirming(true))}
            onBlur={() => setConfirming(false)}
          >
            <Icon
              name="trash"
              className={confirming ? 'text-sale size-3.5 animate-pulse' : 'text-sale size-3.5'}
            />
          </button>
        </div>
      </div>
      <p className="text-foreground-muted text-[13px] leading-relaxed">
        {address.province}، {address.city}، {address.fullAddress}
      </p>
      {confirming ? <p className="text-sale mt-2 text-[12px]">برای حذف دوباره کلیک کنید.</p> : null}
    </div>
  );
}
