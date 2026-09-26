import type { SessionUser } from '@/lib/session';

import { buildMembership, buildStatCards, buildTrendPoints } from '../data/overview';
import type { ActiveDiscount } from '../services/discounts.schemas';
import type { LoyaltyTierProgress } from '../services/loyalty.schemas';
import type { OrderStats } from '../services/orders.schemas';
import type { Order } from '../types';
import { OverviewHero } from './overview-hero';
import { PurchaseTrendCard } from './purchase-trend-card';
import { QuickActionsCard } from './quick-actions-card';
import { RecentOrders } from './recent-orders';
import { StatCardGrid } from './stat-card-grid';

export function OverviewView({
  user,
  recentOrders,
  totalOrders,
  wishlistCount,
  orderStats,
  tier,
  bestDiscount,
}: {
  user: SessionUser;
  recentOrders: Order[];
  totalOrders: number;
  wishlistCount: number;
  orderStats: OrderStats;
  tier: LoyaltyTierProgress;
  bestDiscount: ActiveDiscount | null;
}) {
  return (
    <div className="flex flex-col gap-5">
      <OverviewHero user={user} membership={buildMembership(tier)} />

      <StatCardGrid
        cards={buildStatCards({
          totalOrders,
          totalSpend: orderStats.totalSpend,
          wishlistCount,
          bestDiscount,
        })}
      />

      <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
        <PurchaseTrendCard points={buildTrendPoints(orderStats.monthlyTrend)} />
        <QuickActionsCard />
      </div>

      <RecentOrders orders={recentOrders} />
    </div>
  );
}
