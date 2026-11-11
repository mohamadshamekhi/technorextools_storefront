import { discountPercent } from '@/lib/persian';

import type { ProductCard } from '../types';

/** Price and cart-line id a card must use — the first variant's, falling back to the product's. */
export function cardPurchase(product: ProductCard): { id: string; price: number } {
  return product.firstVariant
    ? { id: product.firstVariant.id, price: product.firstVariant.effectivePrice }
    : { id: product.id, price: product.basePrice };
}

/** Struck-through list price + percent off, only when the variant sells below `basePrice`. */
export function cardDiscount(
  product: ProductCard,
  price: number,
): { compareAt: number; percent: number } | null {
  const percent = discountPercent(price, product.basePrice);
  return percent >= 1 ? { compareAt: product.basePrice, percent } : null;
}

/** Never shows the exact count — only whether it can be ordered online or needs a call. */
export type CardStock = { state: 'in' | 'call' };

/** At or below this, the item isn't sold online — the customer phones to check stock and order. */
export const CALL_TO_ORDER_MAX_QTY = 1;

/** Shared by product cards and the PDP buy box, so both read the same stock state from a qty. */
export function stockState(qty: number | undefined): CardStock {
  if (qty !== undefined && qty <= CALL_TO_ORDER_MAX_QTY) return { state: 'call' };
  return { state: 'in' };
}

export function cardStock(product: ProductCard): CardStock {
  return stockState(product.firstVariant?.stockQty);
}
