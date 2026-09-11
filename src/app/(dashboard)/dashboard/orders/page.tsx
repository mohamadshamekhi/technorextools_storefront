import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { OrdersView } from '@/features/account';
import { ordersApi } from '@/features/account/services/orders.api';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'سفارش‌های من',
  path: routes.dashboard.orders,
  noindex: true,
});

export default async function OrdersPage() {
  const result = await ordersApi.list({ take: 50 }).catch(() => null);

  return <OrdersView orders={result?.items ?? []} />;
}
