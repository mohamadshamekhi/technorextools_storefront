'use client';

import { useRouter } from 'next/navigation';

import { Icon } from '@/components/atoms';
import { formatRelativeTime } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { NOTIFICATION_TYPE_META } from '../data/notification-type-meta';
import { useMarkNotificationRead } from '../hooks/use-notifications';
import type { Notification } from '../types';

/** `link` is an internal app path from `abzar/api`; anything else is ignored so a bad row can't
 * turn into an open redirect. */
function internalPath(link: string | null): string | null {
  return link && link.startsWith('/') && !link.startsWith('//') ? link : null;
}

export function NotificationRow({ notification }: { notification: Notification }) {
  const meta = NOTIFICATION_TYPE_META[notification.type];
  const { mutate: markRead, isPending } = useMarkNotificationRead();
  const router = useRouter();
  const href = internalPath(notification.link);
  const unread = !notification.read;

  return (
    <button
      type="button"
      disabled={unread && isPending}
      onClick={() => {
        if (unread) markRead(notification.id);
        if (href) router.push(href);
      }}
      className={cn(
        'group relative flex w-full items-start gap-3.5 px-4 py-4 text-start transition-colors sm:px-5',
        'hover:bg-surface-muted/70 disabled:opacity-60',
        unread && 'bg-brand-50/45 hover:bg-brand-50/70',
      )}
    >
      {unread ? (
        <span className="bg-brand-500 absolute inset-y-2 start-0 w-[3px] rounded-e-full" />
      ) : null}

      <span
        className="grid size-10 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: meta.tint, color: meta.ink }}
      >
        <Icon name={meta.icon} className="size-[1.05rem]" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className={cn('truncate text-[13.5px]', unread ? 'font-black' : 'font-bold')}>
            {notification.title}
          </p>
          {unread ? <span className="bg-brand-500 size-1.5 shrink-0 rounded-full" /> : null}
        </div>
        <p className="text-foreground-muted mt-1 text-[12.5px] leading-relaxed">
          {notification.body}
        </p>
        <span className="text-foreground-muted mt-1.5 flex items-center gap-1 text-[11px] sm:hidden">
          {formatRelativeTime(notification.createdAt)}
        </span>
      </div>

      <div className="hidden shrink-0 items-center gap-1.5 pt-0.5 sm:flex">
        <span className="text-foreground-muted text-[11px] whitespace-nowrap">
          {formatRelativeTime(notification.createdAt)}
        </span>
        {href ? (
          <Icon
            name="chevronEnd"
            className="text-foreground-muted size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
          />
        ) : null}
      </div>
    </button>
  );
}
