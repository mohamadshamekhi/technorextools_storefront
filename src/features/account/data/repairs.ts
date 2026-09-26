import type { IconName } from '@/components/atoms';
import type { RepairStatus } from '@/features/repairs';

type RepairStatusMeta = { icon: IconName; tint: string; ink: string };

/** Icon/colour per `abzar/api`'s `RepairStatus`. The label itself always comes from the API
 * (`statusLabel`) — this map is presentation-only. */
export const REPAIR_STATUS_META: Record<RepairStatus, RepairStatusMeta> = {
  received: { icon: 'clock', tint: 'oklch(0.96 0.03 75)', ink: 'oklch(0.55 0.15 75)' },
  reviewing: { icon: 'search', tint: 'oklch(0.94 0.035 250)', ink: 'oklch(0.53 0.16 250)' },
  awaiting_customer: { icon: 'headset', tint: 'oklch(0.96 0.03 45)', ink: 'oklch(0.6 0.19 45)' },
  awaiting_parts: { icon: 'box', tint: 'oklch(0.94 0.02 300)', ink: 'oklch(0.52 0.14 300)' },
  in_progress: { icon: 'wrench', tint: 'oklch(0.96 0.03 45)', ink: 'oklch(0.6 0.19 45)' },
  done: { icon: 'check', tint: 'oklch(0.94 0.04 150)', ink: 'oklch(0.5 0.14 155)' },
  delivered: { icon: 'truck', tint: 'oklch(0.94 0.04 150)', ink: 'oklch(0.5 0.14 155)' },
  canceled: { icon: 'close', tint: 'oklch(0.94 0.04 25)', ink: 'oklch(0.55 0.18 25)' },
};

/** What the customer should expect next, per status. */
export const REPAIR_STATUS_HINT: Record<RepairStatus, string> = {
  received: 'درخواست شما ثبت شده و در نوبت بررسی کارشناس فنی است.',
  reviewing: 'کارشناس فنی در حال بررسی دستگاه شماست. نتیجه بررسی به‌زودی همین‌جا اعلام می‌شود.',
  awaiting_customer:
    'بررسی انجام شد و منتظر تأیید شما هستیم. نتیجه بررسی و هزینه تخمینی را ببینید و همین‌جا تأیید یا رد کنید.',
  awaiting_parts: 'قطعه موردنیاز سفارش داده شده است. پس از رسیدن قطعه، تعمیر ادامه پیدا می‌کند.',
  in_progress: 'دستگاه شما در حال تعمیر است. پس از اتمام کار وضعیت همین‌جا به‌روز می‌شود.',
  done: 'تعمیر به پایان رسیده و دستگاه آماده تحویل است. برای هماهنگی تحویل تماس بگیرید.',
  delivered: 'دستگاه تحویل داده شده است. این درخواست بسته شد.',
  canceled: 'این درخواست لغو شده است. برای پیگیری بیشتر با پشتیبانی تماس بگیرید.',
};
