import { formatToman, toPersianDigits } from '@/lib/persian';

import type { StatCard, TrendPoint } from '../types';

export const STAT_CARDS: StatCard[] = [
  {
    icon: 'box',
    tint: 'oklch(0.96 0.03 45)',
    ink: 'oklch(0.62 0.19 45)',
    value: toPersianDigits(12),
    label: 'کل سفارش‌ها',
    delta: '+۲ این ماه',
  },
  {
    icon: 'wallet',
    tint: 'oklch(0.94 0.035 250)',
    ink: 'oklch(0.53 0.16 250)',
    value: formatToman(86_400_000),
    label: 'مجموع خرید (تومان)',
  },
  {
    icon: 'heart',
    tint: 'oklch(0.95 0.05 25)',
    ink: 'oklch(0.55 0.2 25)',
    value: toPersianDigits(3),
    label: 'علاقه‌مندی‌ها',
  },
  {
    icon: 'gift',
    tint: 'oklch(0.94 0.04 150)',
    ink: 'oklch(0.5 0.14 155)',
    value: '۱۵٪',
    label: 'تخفیف فعال',
  },
];

/** Purchase volume over the last six months, as bar-height percentages. */
export const PURCHASE_TREND: TrendPoint[] = [
  { label: 'فروردین', percent: 35 },
  { label: 'اردیبهشت', percent: 55 },
  { label: 'خرداد', percent: 40 },
  { label: 'تیر', percent: 70 },
  { label: 'مرداد', percent: 92 },
  { label: 'شهریور', percent: 60 },
];

export const MEMBERSHIP = {
  tier: 'مشتری طلایی',
  progress: 68,
  toNextLabel: 'تا سطح الماس ۳۲٪ باقی مانده',
  perk: '۱۵٪ تخفیف ویژه اعضای طلایی فعال است',
};
