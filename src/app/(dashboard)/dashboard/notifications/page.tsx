import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { NotificationsView } from '@/features/account';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'نوتیفیکیشن‌ها',
  path: routes.dashboard.notifications,
  noindex: true,
});

export default function NotificationsPage() {
  return <NotificationsView />;
}
