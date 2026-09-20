import { formatPersianMonth, formatToman, toPersianDigits } from '@/lib/persian';

import type { ActiveDiscount } from '../services/discounts.schemas';
import type { LoyaltyTierProgress } from '../services/loyalty.schemas';
import type { StatCard, TrendPoint } from '../types';

function formatDiscountValue(discount: ActiveDiscount): string {
  return discount.amountType === 'percent'
    ? `${toPersianDigits(discount.value)}٪`
    : formatToman(discount.value);
}

/** Real, backend-derived overview stat cards. Omits the discount card when none is active. */
export function buildStatCards(input: {
  totalOrders: number;
  totalSpend: number;
  wishlistCount: number;
  bestDiscount: ActiveDiscount | null;
}): StatCard[] {
  const cards: StatCard[] = [
    {
      icon: 'box',
      tint: 'oklch(0.96 0.03 45)',
      ink: 'oklch(0.62 0.19 45)',
      value: toPersianDigits(input.totalOrders),
      label: 'کل سفارش‌ها',
    },
    {
      icon: 'wallet',
      tint: 'oklch(0.94 0.035 250)',
      ink: 'oklch(0.53 0.16 250)',
      value: formatToman(input.totalSpend),
      label: 'مجموع خرید (تومان)',
    },
    {
      icon: 'heart',
      tint: 'oklch(0.95 0.05 25)',
      ink: 'oklch(0.55 0.2 25)',
      value: toPersianDigits(input.wishlistCount),
      label: 'علاقه‌مندی‌ها',
    },
  ];
  if (input.bestDiscount) {
    cards.push({
      icon: 'gift',
      tint: 'oklch(0.94 0.04 150)',
      ink: 'oklch(0.5 0.14 155)',
      value: formatDiscountValue(input.bestDiscount),
      label: 'تخفیف فعال',
    });
  }
  return cards;
}

/** Six-month purchase volume, as bar-height percentages against the peak month. */
export function buildTrendPoints(
  monthlyTrend: Array<{ month: string; amount: number }>,
): TrendPoint[] {
  const peak = Math.max(1, ...monthlyTrend.map((point) => point.amount));
  return monthlyTrend.map((point) => ({
    label: formatPersianMonth(point.month),
    percent: Math.round((point.amount / peak) * 100),
  }));
}

export function buildMembership(tier: LoyaltyTierProgress) {
  return {
    tier: tier.tier.title,
    progress: tier.progressPercent,
    toNextLabel: tier.nextTier
      ? `تا سطح ${tier.nextTier.title} ${toPersianDigits(100 - tier.progressPercent)}٪ باقی مانده`
      : 'بالاترین سطح عضویت',
    lifetimePoints: `${toPersianDigits(tier.lifetimePoints)} امتیاز`,
  };
}
