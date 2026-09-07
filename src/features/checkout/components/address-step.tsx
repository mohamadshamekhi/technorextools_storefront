'use client';

import { Icon } from '@/components/atoms';

import { ADDRESSES } from '../data/addresses';
import { AddressCard } from './address-card';
import { CheckoutNextButton } from './checkout-next-button';
import { NewAddressForm } from './new-address-form';

type AddressStepProps = {
  selectedId: string;
  onSelect: (id: string) => void;
  showNewAddress: boolean;
  onToggleNewAddress: () => void;
  onContinue: () => void;
};

export function AddressStep({
  selectedId,
  onSelect,
  showNewAddress,
  onToggleNewAddress,
  onContinue,
}: AddressStepProps) {
  return (
    <div className="border-hairline bg-surface rounded-card border p-7">
      <h2 className="mb-5 text-[17px] font-black">آدرس تحویل سفارش</h2>

      <div className="mb-4.5 flex flex-col gap-3">
        {ADDRESSES.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={selectedId === address.id}
            onSelect={() => onSelect(address.id)}
          />
        ))}
        <button
          type="button"
          onClick={onToggleNewAddress}
          className="border-hairline text-foreground-muted hover:border-brand-500/50 flex items-center gap-2.5 rounded-2xl border border-dashed p-4 text-[13.5px] font-bold transition-colors"
        >
          <Icon name="plus" className="size-4" />
          افزودن آدرس جدید
        </button>
      </div>

      {showNewAddress ? <NewAddressForm /> : null}

      <div className="mt-6 flex">
        <CheckoutNextButton onClick={onContinue}>ادامه به روش پرداخت</CheckoutNextButton>
      </div>
    </div>
  );
}
