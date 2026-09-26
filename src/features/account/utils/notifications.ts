import type { Notification } from '../types';

const dayLabelFormatter = new Intl.DateTimeFormat('fa-IR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export type NotificationGroup = { key: string; label: string; items: Notification[] };

const dayKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

/** "امروز" / "دیروز" / full Persian date for a notification's day. */
function dayLabel(date: Date, now: Date): string {
  const today = dayKey(now);
  const yesterday = dayKey(new Date(now.getTime() - 86_400_000));
  const key = dayKey(date);
  if (key === today) return 'امروز';
  if (key === yesterday) return 'دیروز';
  return dayLabelFormatter.format(date);
}

/** Groups notifications into day buckets, preserving the API's newest-first order. */
export function groupNotificationsByDay(items: Notification[]): NotificationGroup[] {
  const now = new Date();
  const groups: NotificationGroup[] = [];

  for (const item of items) {
    const date = new Date(item.createdAt);
    const key = dayKey(date);
    const last = groups.at(-1);
    if (last && last.key === key) {
      last.items.push(item);
      continue;
    }
    groups.push({ key, label: dayLabel(date, now), items: [item] });
  }

  return groups;
}
