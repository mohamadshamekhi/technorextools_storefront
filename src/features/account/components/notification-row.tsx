import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { AccountNotification } from '../types';

export function NotificationRow({ notification }: { notification: AccountNotification }) {
  return (
    <div
      className={cn(
        'border-hairline flex items-start gap-3.5 rounded-2xl border p-4',
        notification.unread ? 'bg-brand-50/40' : 'bg-surface',
      )}
    >
      <span
        className="grid size-9 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: notification.tint, color: notification.ink }}
      >
        <Icon name={notification.icon} className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-bold">{notification.title}</p>
        <p className="text-foreground-muted mt-0.5 text-[12.5px] leading-relaxed">
          {notification.body}
        </p>
      </div>
      <span className="text-foreground-muted shrink-0 text-[11px] whitespace-nowrap">
        {notification.time}
      </span>
    </div>
  );
}
