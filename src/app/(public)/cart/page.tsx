import type { Metadata } from 'next';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';
import { CartBreadcrumb, CartPageView } from '@/features/cart';
import { PRODUCTS } from '@/features/marketing';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'سبد خرید',
  path: routes.cart,
  noindex: true,
});

export default function CartPage() {
  return (
    <Container>
      <CartBreadcrumb />
      <CartPageView upsellPool={PRODUCTS} />
    </Container>
  );
}
