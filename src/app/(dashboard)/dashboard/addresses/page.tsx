import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { AddressesView } from '@/features/account';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'آدرس‌های من',
  path: routes.dashboard.addresses,
  noindex: true,
});

export default function AddressesPage() {
  return <AddressesView />;
}
