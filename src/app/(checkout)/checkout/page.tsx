import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { listShippingMethods } from '@/features/cart/services/shipping.api';
import { CheckoutPageView } from '@/features/checkout';
import { checkoutApi } from '@/features/checkout/services/checkout.api';
import { buildMetadata } from '@/lib/seo';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({
  title: 'پرداخت',
  path: routes.checkout,
  noindex: true,
});

/** `abzar/api`'s checkout endpoints are all authenticated — bounce guests to login first. */
export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) redirect(`${routes.auth.login}?next=${encodeURIComponent(routes.checkout)}`);

  const [shippingMethods, paymentMethods] = await Promise.all([
    listShippingMethods().catch(() => []),
    checkoutApi.listPaymentMethods().catch(() => []),
  ]);

  return <CheckoutPageView shippingMethods={shippingMethods} paymentMethods={paymentMethods} />;
}
