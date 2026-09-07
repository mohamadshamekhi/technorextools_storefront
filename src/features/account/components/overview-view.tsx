import type { SessionUser } from '@/lib/session';

import { ORDERS } from '../data/orders';
import { MembershipCard } from './membership-card';
import { PageHeading } from './page-heading';
import { PurchaseTrendCard } from './purchase-trend-card';
import { RecentOrders } from './recent-orders';
import { StatCardGrid } from './stat-card-grid';

export function OverviewView({ user }: { user: SessionUser }) {
  return (
    <div>
      <PageHeading
        title={`سلام${user.name ? `، ${user.name}` : ''} 👋`}
        subtitle="خلاصه‌ای از فعالیت حساب کاربری شما"
      />
      <StatCardGrid />
      <div className="mb-7 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <PurchaseTrendCard />
        <MembershipCard />
      </div>
      <RecentOrders orders={ORDERS.slice(0, 3)} />
    </div>
  );
}
