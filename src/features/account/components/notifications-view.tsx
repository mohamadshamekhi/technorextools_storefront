'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { useMarkAllNotificationsRead, useNotifications } from '../hooks/use-notifications';
import { NotificationsEmpty, NotificationsList } from './notifications-list';
import { PageHeading } from './page-heading';

type Filter = 'all' | 'unread';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'همه' },
  { value: 'unread', label: 'خوانده‌نشده' },
];

export function NotificationsView() {
  const [filter, setFilter] = useState<Filter>('all');
  const notificationsQuery = useNotifications();
  const markAllRead = useMarkAllNotificationsRead();

  const notifications = notificationsQuery.data ?? [];
  const unreadCount = notifications.filter((n) => !n.read).length;
  const visible = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="">
      <PageHeading
        title="نوتیفیکیشن‌ها"
        subtitle="آخرین رویدادهای حساب و سفارش‌های شما"
        action={
          unreadCount ? (
            <button
              type="button"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
              className="border-hairline text-foreground-muted hover:border-brand-500/40 hover:text-brand-600 inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl border px-3 text-[12.5px] font-bold transition-colors disabled:opacity-50"
            >
              <Icon name="check" className="size-3.5" />
              خواندن همه
            </button>
          ) : null
        }
      />

      <div className="border-hairline bg-surface mb-4 flex w-fit items-center gap-1 rounded-xl border p-1">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            aria-pressed={filter === item.value}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-lg px-3.5 text-[12.5px] font-bold transition-colors',
              filter === item.value
                ? 'bg-brand-500 text-white'
                : 'text-foreground-muted hover:text-foreground',
            )}
          >
            {item.label}
            {item.value === 'unread' && unreadCount ? (
              <span
                className={cn(
                  'grid min-w-4.5 place-items-center rounded-full px-1 text-[10px] leading-4',
                  filter === 'unread' ? 'bg-white/25 text-white' : 'bg-brand-50 text-brand-600',
                )}
              >
                {toPersianDigits(unreadCount)}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {notificationsQuery.isPending ? (
        <div className="flex flex-col gap-2.5" aria-live="polite" aria-busy="true">
          <div className="bg-surface h-20 animate-pulse rounded-2xl" />
          <div className="bg-surface h-20 animate-pulse rounded-2xl" />
          <div className="bg-surface h-20 animate-pulse rounded-2xl" />
        </div>
      ) : notificationsQuery.isError ? (
        <p className="text-sale text-[13.5px]">
          بارگذاری نوتیفیکیشن‌ها ناموفق بود. صفحه را رفرش کنید.
        </p>
      ) : visible.length === 0 ? (
        <NotificationsEmpty filtered={filter === 'unread'} />
      ) : (
        <NotificationsList notifications={visible} />
      )}
    </div>
  );
}
