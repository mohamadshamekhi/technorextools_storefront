import type { IconName } from '@/components/atoms';

import type {
  OrderDetail,
  OrderListItem,
  OrderStatus,
  PaymentMethod,
} from '../services/orders.schemas';

export type { OrderDetail, OrderListItem, OrderStatus, PaymentMethod };
/** Alias kept for existing call sites — a list-item order summary. */
export type Order = OrderListItem;

/** Presentation metadata for an order status — icon + colours. */
export type OrderStatusMeta = {
  icon: IconName;
  label: string;
  tint: string;
  ink: string;
};

export type { WishlistItem } from '../services/wishlist.schemas';

export type { Notification, NotificationType } from '../services/notifications.schemas';

/** A headline metric on the overview page. */
export type StatCard = {
  icon: IconName;
  tint: string;
  ink: string;
  value: string;
  label: string;
  delta?: string;
};

export type TrendPoint = { label: string; percent: number };

export type Membership = {
  tier: string;
  progress: number;
  toNextLabel: string;
  lifetimePoints: string;
};

export type AccountNavItem = {
  href: string;
  label: string;
  icon: IconName;
  badge?: number;
};
