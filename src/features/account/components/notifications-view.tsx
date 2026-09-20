'use client';

import { Icon } from '@/components/atoms';

import { useMarkAllNotificationsRead, useNotifications } from '../hooks/use-notifications';
import { NotificationRow } from './notification-row';
import { PageHeading } from './page-heading';

export function NotificationsView() {
  const notificationsQuery = useNotifications();
  const markAllRead = useMarkAllNotificationsRead();

  const notifications = notificationsQuery.data ?? [];
  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div>
      <div className="flex max-w-2xl items-start justify-between gap-3">
        <PageHeading title="نوتیفیکیشن‌ها" subtitle="آخرین رویدادهای حساب و سفارش‌های شما" />
        {hasUnread ? (
          <button
            type="button"
            onClick={() => markAllRead.mutate()}
            disabled={markAllRead.isPending}
            className="text-brand-600 shrink-0 text-[12.5px] font-bold disabled:opacity-50"
          >
            علامت‌گذاری همه به‌عنوان خوانده‌شده
          </button>
        ) : null}
      </div>

      {notificationsQuery.isPending ? (
        <div className="flex max-w-2xl flex-col gap-2.5" aria-live="polite" aria-busy="true">
          <div className="bg-surface-muted h-18.5 animate-pulse rounded-2xl" />
          <div className="bg-surface-muted h-18.5 animate-pulse rounded-2xl" />
          <div className="bg-surface-muted h-18.5 animate-pulse rounded-2xl" />
        </div>
      ) : notificationsQuery.isError ? (
        <p className="text-sale text-[13.5px]">
          بارگذاری نوتیفیکیشن‌ها ناموفق بود. صفحه را رفرش کنید.
        </p>
      ) : notifications.length === 0 ? (
        <div className="border-hairline bg-surface-muted/60 flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-10 text-center">
          <Icon name="bell" className="text-brand-500 size-7" />
          <p className="text-foreground-muted text-[13px] leading-relaxed">
            نوتیفیکیشن جدیدی ندارید.
          </p>
        </div>
      ) : (
        <div className="flex max-w-2xl flex-col gap-2.5">
          {notifications.map((notification) => (
            <NotificationRow key={notification.id} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
}
