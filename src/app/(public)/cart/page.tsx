import type { Metadata } from 'next';

import { Container } from '@/components/atoms';
import { routes } from '@/config/routes';
import { CartBreadcrumb, CartPageView } from '@/features/cart';
import { listShippingMethods } from '@/features/cart/services/shipping.api';
import type { UpsellProduct } from '@/features/cart/types';
import { listProducts } from '@/features/catalog/services/catalog.api';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'سبد خرید',
  path: routes.cart,
  noindex: true,
});

export default async function CartPage() {
  const [result, shippingMethods] = await Promise.all([
    listProducts({ sort: 'newest' }, { take: 8 }).catch(() => null),
    listShippingMethods().catch(() => []),
  ]);
  const upsellPool: UpsellProduct[] = (result?.items ?? []).map((product) => ({
    id: product.id,
    title: product.title,
    price: product.basePrice,
    slug: product.slug,
    categorySlug: product.slug,
    imageUrl: product.mainImageUrl,
  }));

  return (
    <Container>
      <CartBreadcrumb />
      <CartPageView upsellPool={upsellPool} shippingMethods={shippingMethods} />
    </Container>
  );
}
