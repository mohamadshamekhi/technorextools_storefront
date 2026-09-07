import { toPersianDigits } from '@/lib/persian';

export { toPersianDigits as toFaDigits } from '@/lib/persian';

/** `09121234567` → `۰۹۱۲ ۱۲۳ ۴۵۶۷` for read-only display. */
export function formatPhoneFa(phone: string): string {
  const grouped = phone.replace(/^(\d{4})(\d{3})(\d{4})$/, '$1 $2 $3');
  return toPersianDigits(grouped);
}
