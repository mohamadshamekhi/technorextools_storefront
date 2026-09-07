import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { OrdersView } from '@/features/account';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'سفارش‌های من',
  path: routes.dashboard.orders,
  noindex: true,
});

export default function OrdersPage() {
  return <OrdersView />;
}
