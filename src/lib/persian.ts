const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** Convert every ASCII digit in a string to its Persian glyph. */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d);
}

/** Group a toman amount with thousands separators, in Persian digits. */
export function formatToman(amount: number): string {
  return toPersianDigits(amount.toLocaleString('en-US'));
}

/** Whole-percent discount of `price` against `compareAt`. */
export function discountPercent(price: number, compareAt: number): number {
  if (compareAt <= 0) return 0;
  return Math.round((1 - price / compareAt) * 100);
}

/** Persian (Jalali) month name for a Gregorian `"YYYY-MM"` key, e.g. `"2026-03"` → "اسفند". */
export function formatPersianMonth(monthKey: string): string {
  const [year, month] = monthKey.split('-').map(Number);
  const date = new Date(year ?? 0, (month ?? 1) - 1, 15);
  return new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'long' }).format(date);
}

/** Persian relative time ("۲ ساعت پیش") from an ISO timestamp. */
export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60_000);
  if (minutes < 1) return 'همین الان';
  if (minutes < 60) return `${toPersianDigits(minutes)} دقیقه پیش`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${toPersianDigits(hours)} ساعت پیش`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'دیروز';
  if (days < 30) return `${toPersianDigits(days)} روز پیش`;
  const months = Math.round(days / 30);
  if (months < 12) return `${toPersianDigits(months)} ماه پیش`;
  return `${toPersianDigits(Math.round(months / 12))} سال پیش`;
}
