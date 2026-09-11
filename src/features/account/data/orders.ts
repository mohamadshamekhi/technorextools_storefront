import type { OrderStatus, OrderStatusMeta } from '../types';

/** Presentation metadata for `abzar/api`'s `OrderStatus` enum (`prisma/schema.prisma`). */
export const ORDER_STATUS_META: Record<OrderStatus, OrderStatusMeta> = {
  pending_payment: {
    icon: 'clock',
    label: 'در انتظار پرداخت',
    tint: 'oklch(0.96 0.03 75)',
    ink: 'oklch(0.55 0.15 75)',
  },
  payment_failed: {
    icon: 'alert',
    label: 'پرداخت ناموفق',
    tint: 'oklch(0.94 0.05 25)',
    ink: 'oklch(0.55 0.2 25)',
  },
  abandoned: {
    icon: 'close',
    label: 'رهاشده',
    tint: 'oklch(0.94 0.005 260)',
    ink: 'oklch(0.5 0.01 260)',
  },
  paid: {
    icon: 'check',
    label: 'پرداخت‌شده',
    tint: 'oklch(0.94 0.04 150)',
    ink: 'oklch(0.5 0.14 155)',
  },
  processing: {
    icon: 'box',
    label: 'در حال پردازش',
    tint: 'oklch(0.96 0.03 45)',
    ink: 'oklch(0.6 0.19 45)',
  },
  shipped: {
    icon: 'truck',
    label: 'ارسال شده',
    tint: 'oklch(0.94 0.035 250)',
    ink: 'oklch(0.53 0.16 250)',
  },
  delivered: {
    icon: 'check',
    label: 'تحویل‌شده',
    tint: 'oklch(0.94 0.04 150)',
    ink: 'oklch(0.5 0.14 155)',
  },
  cancelled: {
    icon: 'close',
    label: 'لغو شده',
    tint: 'oklch(0.94 0.05 25)',
    ink: 'oklch(0.55 0.2 25)',
  },
};

/** Fallback label when `/storefront/payment-methods` didn't have a matching title cached. */
export const PAYMENT_METHOD_LABEL: Record<'online' | 'cash', string> = {
  online: 'پرداخت آنلاین',
  cash: 'پرداخت در محل',
};
