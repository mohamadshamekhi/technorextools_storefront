import type { Deal } from '../types';
import { PRODUCTS } from './products';

export { PRODUCTS };

export const DEALS: Deal[] = [
  { id: 'at-4186', title: 'بکس بادی ۱/۲ اینچ AT-4186', price: 21_500_000, compareAt: 24_800_000 },
  { id: 'at-4181', title: 'پیچ‌گوشتی بادی مولتی‌تیری AT-4181', price: 13_700_000, compareAt: 16_200_000 },
  { id: 'at-4112', title: 'دریل بادی صنعتی AT-4112', price: 9_800_000, compareAt: 11_900_000 },
  { id: 'at-7033', title: 'مینی فرز بادی AT-7033', price: 5_900_000, compareAt: 7_400_000 },
  { id: 'at-2050', title: 'چکش بادی سوزنی AT-2050', price: 4_990_000, compareAt: 6_300_000 },
];

export const PRODUCT_TABS: { id: 'all' | 'air' | 'cordless' | 'accessory'; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'air', label: 'بادی' },
  { id: 'cordless', label: 'شارژی' },
  { id: 'accessory', label: 'لوازم جانبی' },
];

/** Distinct brands present in the catalogue, in display order. */
export const CATALOG_BRANDS = [...new Set(PRODUCTS.map((product) => product.brand))];
