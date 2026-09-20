'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { useAddresses, useDeleteAddress, type Address } from '@/features/checkout';

import { AddAddressButton } from './add-address-button';
import { AddressCard } from './address-card';
import { AddressFormDialog } from './address-form-dialog';
import { PageHeading } from './page-heading';

export function AddressesView() {
  const addressesQuery = useAddresses();
  const deleteAddress = useDeleteAddress();
  const [dialogAddress, setDialogAddress] = useState<Address | 'new' | null>(null);

  const addresses = addressesQuery.data ?? [];

  return (
    <div>
      <PageHeading
        title="آدرس‌های من"
        action={<AddAddressButton onClick={() => setDialogAddress('new')} />}
      />

      {addressesQuery.isPending ? (
        <div className="grid gap-3.5 sm:grid-cols-2" aria-live="polite" aria-busy="true">
          <div className="bg-surface-muted h-28 animate-pulse rounded-2xl" />
          <div className="bg-surface-muted h-28 animate-pulse rounded-2xl" />
        </div>
      ) : addressesQuery.isError ? (
        <p className="text-sale text-[13.5px]">بارگذاری آدرس‌ها ناموفق بود. صفحه را رفرش کنید.</p>
      ) : addresses.length === 0 ? (
        <div className="border-hairline bg-surface-muted/60 flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-10 text-center">
          <Icon name="pin" className="text-brand-500 size-7" />
          <p className="text-foreground-muted text-[13px] leading-relaxed">
            هنوز آدرسی ثبت نکرده‌اید.
          </p>
        </div>
      ) : (
        <div className="grid gap-3.5 sm:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => setDialogAddress(address)}
              onDelete={() => deleteAddress.mutate(address.id)}
              deleting={deleteAddress.isPending && deleteAddress.variables === address.id}
            />
          ))}
        </div>
      )}

      <AddressFormDialog
        open={dialogAddress !== null}
        onClose={() => setDialogAddress(null)}
        address={dialogAddress === 'new' || dialogAddress === null ? undefined : dialogAddress}
      />
    </div>
  );
}
