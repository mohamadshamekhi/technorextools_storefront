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

export type Address = {
  id: string;
  title: string;
  body: string;
  isDefault: boolean;
};

export type WishlistItem = {
  id: string;
  title: string;
  price: number;
};

export type AccountNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  icon: IconName;
  tint: string;
  ink: string;
  unread: boolean;
};

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

export type AccountNavItem = {
  href: string;
  label: string;
  icon: IconName;
  badge?: number;
};
