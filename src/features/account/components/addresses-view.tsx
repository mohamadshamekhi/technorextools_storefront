import { ADDRESSES } from '../data/addresses';
import { AddAddressButton } from './add-address-button';
import { AddressCard } from './address-card';
import { PageHeading } from './page-heading';

export function AddressesView() {
  return (
    <div>
      <PageHeading title="آدرس‌های من" action={<AddAddressButton />} />
      <div className="grid gap-3.5 sm:grid-cols-2">
        {ADDRESSES.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>
    </div>
  );
}
