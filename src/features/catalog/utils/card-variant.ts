import type { ProductCard } from '../types';

/** Price and cart-line id a card must use — the first variant's, falling back to the product's. */
export function cardPurchase(product: ProductCard): { id: string; price: number } {
  return product.firstVariant
    ? { id: product.firstVariant.id, price: product.firstVariant.effectivePrice }
    : { id: product.id, price: product.basePrice };
}
