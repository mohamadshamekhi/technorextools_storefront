import type { TrackedOrder } from '../types';

/**
 * Demo fixtures — there is no database in this repo. When `abzar/api` exposes a
 * public tracking endpoint, replace `findDemoOrder` with an `apiClient` call
 * that parses the response with a Zod schema.
 */
export const DEMO_ORDERS: TrackedOrder[] = [
  {
    code: 'PA-249672',
    mobile: '09121234567',
    status: 'shipped',
    statusLabel: 'در حال ارسال',
    carrier: 'پست پیشتاز ایران',
    trackingNumber: '2494008820037',
    timeline: [
      { key: 'processing', label: 'ثبت و تأیید سفارش', date: '۱۴۰۳/۰۵/۱۲ - ۰۹:۳۰' },
      { key: 'packed', label: 'بسته‌بندی در انبار', date: '۱۴۰۳/۰۵/۱۲ - ۱۶:۱۰' },
      { key: 'shipped', label: 'تحویل به شرکت پست', date: '۱۴۰۳/۰۵/۱۳ - ۱۰:۴۵' },
      { key: 'delivered', label: 'تحویل به مشتری', date: null },
    ],
    items: [
      { title: 'پیچ‌گوشتی بادی تکنورکس مدل PA-3000', quantity: 1, total: 4850000 },
      { title: 'مجموعه سری بکس بادی ۱۰ پارچه', quantity: 2, total: 1720000 },
    ],
  },
];

/** Case-insensitive code match plus exact mobile match. */
export function findDemoOrder(code: string, mobile: string): TrackedOrder | null {
  const normalizedCode = code.trim().toUpperCase();
  const normalizedMobile = mobile.trim();
  return (
    DEMO_ORDERS.find(
      (order) => order.code.toUpperCase() === normalizedCode && order.mobile === normalizedMobile,
    ) ?? null
  );
}
