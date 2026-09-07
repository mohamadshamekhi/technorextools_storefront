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
