import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { CheckoutPageView } from '@/features/checkout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'پرداخت',
  path: routes.checkout,
  noindex: true,
});

export default function CheckoutPage() {
  return <CheckoutPageView />;
}
