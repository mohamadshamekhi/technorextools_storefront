import type { IconName } from '@/components/atoms';

export type OrderStatus = 'processing' | 'shipping' | 'delivered';

/** A customer order summary (mock — the real record lives in `abzar/api`). */
export type Order = {
  code: string;
  status: OrderStatus;
  itemCount: number;
  date: string;
  total: number;
};

/** Presentation metadata for an order status — colours + fulfilment progress. */
export type OrderStatusMeta = {
  icon: IconName;
  label: string;
  tint: string;
  ink: string;
  /** Completed count out of `FULFILMENT_STAGES.length`. */
  stagesDone: number;
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
