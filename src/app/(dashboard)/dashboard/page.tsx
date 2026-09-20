import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { OverviewView } from '@/features/account';
import { discountsApi } from '@/features/account/services/discounts.api';
import { loyaltyApi } from '@/features/account/services/loyalty.api';
import { ordersApi } from '@/features/account/services/orders.api';
import type { OrderStats } from '@/features/account/services/orders.schemas';
import { wishlistApi } from '@/features/account/services/wishlist.api';
import { buildMetadata } from '@/lib/seo';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({ title: 'خلاصهٔ داشبورد', noindex: true });

const emptyOrderStats: OrderStats = { totalSpend: 0, paidOrderCount: 0, monthlyTrend: [] };

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect(routes.auth.login);

  const [orders, orderStats, wishlist, loyalty, discounts] = await Promise.all([
    ordersApi.list({ take: 3 }).catch(() => ({ items: [], total: 0 })),
    ordersApi.stats().catch(() => emptyOrderStats),
    wishlistApi.list().catch(() => []),
    loyaltyApi.summary({ take: 1 }).catch(() => null),
    discountsApi.active().catch(() => []),
  ]);

  return (
    <OverviewView
      user={user}
      recentOrders={orders.items}
      totalOrders={orders.total}
      wishlistCount={wishlist.length}
      orderStats={orderStats}
      tier={
        loyalty?.tier ?? {
          lifetimePoints: 0,
          tier: { key: 'bronze', title: 'برنزی', minPoints: 0 },
          nextTier: null,
          pointsToNextTier: null,
          progressPercent: 0,
        }
      }
      bestDiscount={discounts[0] ?? null}
    />
  );
}
