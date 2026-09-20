import type { SessionUser } from '@/lib/session';

import { buildStatCards, buildTrendPoints } from '../data/overview';
import type { ActiveDiscount } from '../services/discounts.schemas';
import type { LoyaltyTierProgress } from '../services/loyalty.schemas';
import type { OrderStats } from '../services/orders.schemas';
import type { Order } from '../types';
import { PageHeading } from './page-heading';
import { PurchaseTrendCard } from './purchase-trend-card';
import { RecentOrders } from './recent-orders';
import { StatCardGrid } from './stat-card-grid';

export function OverviewView({
  user,
  recentOrders,
  totalOrders,
  wishlistCount,
  orderStats,
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
    <div>
      <PageHeading
        title={`سلام${user.name ? `، ${user.name}` : ''} 👋`}
        subtitle="خلاصه‌ای از فعالیت حساب کاربری شما"
      />
      <StatCardGrid
        cards={buildStatCards({
          totalOrders,
          totalSpend: orderStats.totalSpend,
          wishlistCount,
          bestDiscount,
        })}
      />
      <div className="mb-7">
        <PurchaseTrendCard points={buildTrendPoints(orderStats.monthlyTrend)} />
      </div>
      <RecentOrders orders={recentOrders} />
    </div>
  );
}
