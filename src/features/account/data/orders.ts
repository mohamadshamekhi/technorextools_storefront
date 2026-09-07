import type { Order, OrderStatus, OrderStatusMeta } from '../types';

/** Fulfilment steps shown in the order timeline, in order. */
export const FULFILMENT_STAGES = ['ثبت سفارش', 'پردازش', 'ارسال', 'تحویل'] as const;

export const ORDER_STATUS_META: Record<OrderStatus, OrderStatusMeta> = {
  processing: {
    icon: 'clock',
    label: 'در حال پردازش',
    tint: 'oklch(0.96 0.03 45)',
    ink: 'oklch(0.6 0.19 45)',
    stagesDone: 2,
  },
  shipping: {
    icon: 'truck',
    label: 'در حال ارسال',
    tint: 'oklch(0.94 0.035 250)',
    ink: 'oklch(0.53 0.16 250)',
    stagesDone: 3,
  },
  delivered: {
    icon: 'check',
    label: 'تحویل شده',
    tint: 'oklch(0.94 0.04 150)',
    ink: 'oklch(0.5 0.14 155)',
    stagesDone: 4,
  },
};

export const ORDERS: Order[] = [
  { code: 'PA-2496872', status: 'delivered', itemCount: 2, date: '۱۰ مرداد ۱۴۰۵', total: 30_200_000 },
  { code: 'PA-2488130', status: 'shipping', itemCount: 1, date: '۲ مرداد ۱۴۰۵', total: 13_700_000 },
  { code: 'PA-2474500', status: 'processing', itemCount: 3, date: '۲۸ تیر ۱۴۰۵', total: 42_500_000 },
];
