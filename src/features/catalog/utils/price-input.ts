import { formatToman, toPersianDigits } from '@/lib/persian';

/** Keep only digits from a price input — Persian/Arabic-Indic digits are mapped to ASCII. */
export function toDigits(raw: string): string {
  return raw
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/\D/g, '')
    .replace(/^0+/, '')
    .slice(0, 12);
}

/** Digits → positive integer, or `undefined` for empty/zero. */
export function digitsToNumber(digits: string): number | undefined {
  const value = Number(digits);
  return Number.isSafeInteger(value) && value > 0 ? value : undefined;
}

/** Digits → grouped Persian display (`۱۲,۵۰۰,۰۰۰`), empty stays empty. */
export function formatDigits(digits: string): string {
  const value = digitsToNumber(digits);
  return value === undefined ? '' : formatToman(value);
}

const MILLION = 1_000_000;

/** `12_500_000` → `۱۲٫۵` (millions, one decimal, Persian separator). */
const millions = (amount: number) =>
  toPersianDigits(Math.round((amount / MILLION) * 10) / 10).replace('.', '٫');

/** Compact amount for tight UI: `۱۲٫۵ میلیون` from a million up, grouped digits below. */
const compactToman = (amount: number) =>
  amount >= MILLION ? `${millions(amount)} میلیون` : formatToman(amount);

/** Short human summary of an active price range, for a section header pill. */
export function priceRangeSummary(min?: number, max?: number): string | undefined {
  if (min !== undefined && max !== undefined)
    return min >= MILLION && max >= MILLION
      ? `${millions(min)} تا ${millions(max)} میلیون`
      : `${compactToman(min)} تا ${compactToman(max)}`;
  if (min !== undefined) return `از ${compactToman(min)}`;
  if (max !== undefined) return `تا ${compactToman(max)}`;
  return undefined;
}
