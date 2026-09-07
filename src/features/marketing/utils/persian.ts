/**
 * Persian number formatting is shared across features (marketing, cart, auth) —
 * the implementation lives in `lib/persian.ts`. Re-exported here so existing
 * relative imports inside this feature keep working unchanged.
 */
export { toPersianDigits, formatToman, discountPercent } from '@/lib/persian';
