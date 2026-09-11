const jalali = new Intl.DateTimeFormat('fa-IR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

/** ISO date → Persian (Jalali) long date, e.g. «۱۲ مرداد ۱۴۰۵». Empty on null. */
export function formatJalaliDate(iso: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : jalali.format(date);
}
