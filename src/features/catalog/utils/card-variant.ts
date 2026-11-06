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

export type CardStock = { state: 'in' | 'low' | 'call'; qty: number | undefined };

/** Low = 2–3 left. Unknown stock (no variant) reads as available. */
export const LOW_STOCK = 3;

/** At or below this, the item isn't sold online — the customer phones to check stock and order. */
export const CALL_TO_ORDER_MAX_QTY = 1;

export function cardStock(product: ProductCard): CardStock {
  const qty = product.firstVariant?.stockQty;
  if (qty === undefined) return { state: 'in', qty };
  if (qty <= CALL_TO_ORDER_MAX_QTY) return { state: 'call', qty };
  return { state: qty <= LOW_STOCK ? 'low' : 'in', qty };
}
