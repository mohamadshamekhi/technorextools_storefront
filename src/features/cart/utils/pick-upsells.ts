import type { Product } from '@/features/marketing';

/** Up to `limit` in-stock products not already in the cart, for the upsell rail. */
export function pickUpsells(products: Product[], cartIds: string[], limit = 4): Product[] {
  return products.filter((product) => product.inStock && !cartIds.includes(product.id)).slice(0, limit);
}
