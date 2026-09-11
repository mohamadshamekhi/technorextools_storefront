'use client';

import { Icon } from '@/components/atoms';

import type { Address } from '../types';
import { AddressCard } from './address-card';
import { AddressEmptyState } from './address-empty-state';
import { CheckoutNextButton } from './checkout-next-button';
import { NewAddressForm } from './new-address-form';

type AddressStepProps = {
  addresses: Address[];
  isLoading: boolean;
  isError: boolean;
  selectedId: string;
  onSelect: (id: string) => void;
  showNewAddress: boolean;
  onToggleNewAddress: () => void;
  onContinue: () => void;
};

export function AddressStep({
  addresses,
  isLoading,
  isError,
  selectedId,
  onSelect,
  showNewAddress,
  onToggleNewAddress,
  onContinue,
}: AddressStepProps) {
  return (
    <div className="border-hairline bg-surface rounded-card border p-7">
      <h2 className="mb-5 text-[17px] font-black">آدرس تحویل سفارش</h2>

      {isLoading ? (
        <div className="mb-4.5 flex flex-col gap-3" aria-live="polite" aria-busy="true">
          <div className="bg-surface-muted h-23 animate-pulse rounded-2xl" />
          <div className="bg-surface-muted h-23 animate-pulse rounded-2xl" />
        </div>
      ) : isError ? (
        <p className="text-sale mb-4.5 text-[13.5px]">
          بارگذاری آدرس‌ها ناموفق بود. صفحه را رفرش کنید.
        </p>
      ) : addresses.length === 0 && !showNewAddress ? (
        <AddressEmptyState onAddAddress={onToggleNewAddress} />
      ) : (
        <>
          <div className="mb-4.5 flex flex-col gap-3">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                selected={selectedId === address.id}
                onSelect={() => onSelect(address.id)}
              />
            ))}
          </div>

          {!showNewAddress ? (
            <button
              type="button"
              onClick={onToggleNewAddress}
              className="border-hairline text-foreground-muted hover:border-brand-500/50 mb-4.5 flex items-center gap-2.5 rounded-2xl border border-dashed p-4 text-[13.5px] font-bold transition-colors"
            >
              <Icon name="plus" className="size-4" />
              افزودن آدرس جدید
            </button>
          ) : null}
        </>
      )}

      {showNewAddress ? (
        <NewAddressForm
          onCreated={(addressId) => {
            onSelect(addressId);
            onToggleNewAddress();
          }}
        />
      ) : null}

      {addresses.length > 0 || showNewAddress ? (
        <div className="mt-6 flex">
          <CheckoutNextButton onClick={onContinue} disabled={!selectedId}>
            ادامه به روش پرداخت
          </CheckoutNextButton>
        </div>
      ) : null}
    </div>
  );
}
