'use client';

import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';

import type { Notification } from '../types';
import { groupNotificationsByDay } from '../utils/notifications';
import { NotificationRow } from './notification-row';

/** Day-grouped notification cards. Empty/loading/error states live in `NotificationsView`. */
export function NotificationsList({ notifications }: { notifications: Notification[] }) {
  return (
    <div className="flex flex-col gap-5">
      {groupNotificationsByDay(notifications).map((group) => (
        <section key={group.key}>
          <div className="mb-2 flex items-center gap-2 px-1">
            <h2 className="text-foreground-muted text-[11.5px] font-bold">{group.label}</h2>
            <span className="bg-hairline h-px flex-1" />
            <span className="text-foreground-muted text-[11px]">
              {toPersianDigits(group.items.length)} مورد
            </span>
          </div>
          <div className="border-hairline bg-surface divide-hairline divide-y overflow-hidden rounded-2xl border shadow-(--shadow-soft)">
            {group.items.map((notification) => (
              <NotificationRow key={notification.id} notification={notification} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/** Shown when the (possibly filtered) list has no rows. */
export function NotificationsEmpty({ filtered }: { filtered: boolean }) {
  return (
    <div className="border-hairline bg-surface flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-14 text-center">
      <span className="bg-brand-50 text-brand-500 grid size-14 place-items-center rounded-2xl">
        <Icon name="bell" className="size-6" />
      </span>
      <p className="text-[14px] font-bold">
        {filtered ? 'همه‌چیز خوانده شده' : 'نوتیفیکیشن جدیدی ندارید'}
      </p>
      <p className="text-foreground-muted max-w-xs text-[12.5px] leading-relaxed">
        {filtered
          ? 'نوتیفیکیشن خوانده‌نشده‌ای باقی نمانده است.'
          : 'وضعیت سفارش‌ها، درخواست‌های تعمیر و تخفیف‌های شما اینجا نمایش داده می‌شود.'}
      </p>
    </div>
  );
}
