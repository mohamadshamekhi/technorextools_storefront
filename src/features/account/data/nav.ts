import { routes } from '@/config/routes';

import type { AccountNavItem } from '../types';

/** `notifications`'s badge is computed at render time from live unread count — see `AccountNavLink`. */
export const ACCOUNT_NAV: AccountNavItem[] = [
  { href: routes.dashboard.root, label: 'خلاصه داشبورد', icon: 'grid' },
  { href: routes.dashboard.orders, label: 'سفارش‌های من', icon: 'box' },
  { href: routes.dashboard.addresses, label: 'آدرس‌های من', icon: 'pin' },
  { href: routes.dashboard.profile, label: 'اطلاعات حساب', icon: 'user' },
  { href: routes.dashboard.repairs, label: 'درخواست‌های تعمیر', icon: 'wrench' },
  { href: routes.dashboard.wishlist, label: 'علاقه‌مندی‌ها', icon: 'heart' },
  { href: routes.dashboard.notifications, label: 'نوتیفیکیشن‌ها', icon: 'bell' },
];
