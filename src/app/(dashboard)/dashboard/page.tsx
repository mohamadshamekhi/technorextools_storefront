import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { OverviewView } from '@/features/account';
import { ordersApi } from '@/features/account/services/orders.api';
import { buildMetadata } from '@/lib/seo';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({ title: 'خلاصهٔ داشبورد', noindex: true });

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect(routes.auth.login);

  const recentOrders = await ordersApi
    .list({ take: 3 })
    .then((result) => result.items)
    .catch(() => []);

  return <OverviewView user={user} recentOrders={recentOrders} />;
}
