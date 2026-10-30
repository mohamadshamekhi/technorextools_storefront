/** Quick price brackets for the catalog price facet (integer Toman, matching the API). */
export type PricePreset = { label: string; minPrice?: number; maxPrice?: number };

const MILLION = 1_000_000;

export const PRICE_PRESETS: readonly PricePreset[] = [
  { label: 'زیر ۱۰ میلیون', maxPrice: 10 * MILLION },
  { label: '۱۰ تا ۵۰ میلیون', minPrice: 10 * MILLION, maxPrice: 50 * MILLION },
  { label: '۵۰ تا ۱۰۰ میلیون', minPrice: 50 * MILLION, maxPrice: 100 * MILLION },
  { label: 'بالای ۱۰۰ میلیون', minPrice: 100 * MILLION },
];
