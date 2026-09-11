import type { UpsellProduct } from '../types';

/** Up to `limit` products not already in the cart, for the upsell rail. */
export function pickUpsells(
  products: UpsellProduct[],
  cartIds: string[],
  limit = 4,
): UpsellProduct[] {
  return products.filter((product) => !cartIds.includes(product.id)).slice(0, limit);
}
