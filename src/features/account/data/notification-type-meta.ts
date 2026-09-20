import type { IconName } from '@/components/atoms';

import type { NotificationType } from '../services/notifications.schemas';

type NotificationTypeMeta = { icon: IconName; tint: string; ink: string };

/** Presentation-only mapping — the API sends `type`, never icon/color. */
export const NOTIFICATION_TYPE_META: Record<NotificationType, NotificationTypeMeta> = {
  order_shipped: { icon: 'truck', tint: 'oklch(0.94 0.035 250)', ink: 'oklch(0.53 0.16 250)' },
  order_delivered: { icon: 'check', tint: 'oklch(0.94 0.04 150)', ink: 'oklch(0.5 0.14 155)' },
  order_cancelled: { icon: 'close', tint: 'oklch(0.94 0.04 25)', ink: 'oklch(0.55 0.18 25)' },
  discount: { icon: 'gift', tint: 'oklch(0.96 0.03 45)', ink: 'oklch(0.62 0.19 45)' },
  system: { icon: 'bell', tint: 'oklch(0.94 0.01 260)', ink: 'oklch(0.5 0.02 260)' },
};
