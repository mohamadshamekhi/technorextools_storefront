import type { AccountNotification } from '../types';

export const NOTIFICATIONS: AccountNotification[] = [
  {
    id: 'n1',
    title: 'سفارش شما ارسال شد',
    body: 'سفارش PA-2488130 تحویل پست شد و تا ۲ روز دیگر به دستتان می‌رسد.',
    time: '۲ ساعت پیش',
    icon: 'truck',
    tint: 'oklch(0.94 0.035 250)',
    ink: 'oklch(0.53 0.16 250)',
    unread: true,
  },
  {
    id: 'n2',
    title: 'کد تخفیف ویژه اعضای طلایی',
    body: '۱۵٪ تخفیف روی خرید بعدی شما فعال شد.',
    time: 'دیروز',
    icon: 'gift',
    tint: 'oklch(0.96 0.03 45)',
    ink: 'oklch(0.62 0.19 45)',
    unread: true,
  },
  {
    id: 'n3',
    title: 'سفارش با موفقیت تحویل شد',
    body: 'سفارش PA-2496872 با موفقیت به دست شما رسید.',
    time: '۵ روز پیش',
    icon: 'check',
    tint: 'oklch(0.94 0.04 150)',
    ink: 'oklch(0.5 0.14 155)',
    unread: false,
  },
];

/** Count of unread notifications — drives the sidebar/topbar badges. */
export const UNREAD_COUNT = NOTIFICATIONS.filter((n) => n.unread).length;
