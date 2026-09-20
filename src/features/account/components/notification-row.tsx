'use client';

import { Icon } from '@/components/atoms';
import { formatRelativeTime } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { NOTIFICATION_TYPE_META } from '../data/notification-type-meta';
import { useMarkNotificationRead } from '../hooks/use-notifications';
import type { Notification } from '../types';

export function NotificationRow({ notification }: { notification: Notification }) {
  const meta = NOTIFICATION_TYPE_META[notification.type];
  const { mutate: markRead, isPending } = useMarkNotificationRead();

  return (
    <button
      type="button"
      disabled={!notification.read && isPending}
      onClick={() => {
        if (!notification.read) markRead(notification.id);
      }}
      className={cn(
        'border-hairline flex w-full items-start gap-3.5 rounded-2xl border p-4 text-start transition-colors',
        notification.read ? 'bg-surface' : 'bg-brand-50/40 hover:bg-brand-50/60',
      )}
    >
      <span
        className="grid size-9 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: meta.tint, color: meta.ink }}
      >
        <Icon name={meta.icon} className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-bold">{notification.title}</p>
        <p className="text-foreground-muted mt-0.5 text-[12.5px] leading-relaxed">
          {notification.body}
        </p>
      </div>
      <span className="text-foreground-muted shrink-0 text-[11px] whitespace-nowrap">
        {formatRelativeTime(notification.createdAt)}
      </span>
    </button>
  );
}
