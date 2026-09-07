import { NOTIFICATIONS } from '../data/notifications';
import { NotificationRow } from './notification-row';
import { PageHeading } from './page-heading';

export function NotificationsView() {
  return (
    <div>
      <PageHeading title="نوتیفیکیشن‌ها" subtitle="آخرین رویدادهای حساب و سفارش‌های شما" />
      <div className="flex max-w-2xl flex-col gap-2.5">
        {NOTIFICATIONS.map((notification) => (
          <NotificationRow key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
