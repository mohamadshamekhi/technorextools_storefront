import type { IconName } from '@/components/atoms';

export type AuthTrustPoint = { icon: IconName; label: string };

/** Selling points shown on the auth split-screen brand panel. */
export const AUTH_TRUST_POINTS: AuthTrustPoint[] = [
  { icon: 'shield', label: 'گارانتی اصالت روی تمام محصولات' },
  { icon: 'truck', label: 'پیگیری آسان سفارش‌ها در پروفایل' },
  { icon: 'wallet', label: 'دسترسی به تخفیف‌های ویژه‌ی اعضا' },
];

export const AUTH_PANEL_COPY = {
  heading: 'ورود اول به حساب کارگاهی شما',
  body: 'سفارش‌ها، آدرس‌ها و تاریخچه‌ی خرید ابزار بادی و شارژی خود را در یک حساب مدیریت کنید.',
} as const;
