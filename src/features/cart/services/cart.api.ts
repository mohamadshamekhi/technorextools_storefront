import 'server-only';

import { apiClient } from '@/lib/api-client';

import { cartViewSchema, discountValidationSchema } from './cart.schemas';

/**
 * Server-only wrappers over `abzar/api`'s authenticated cart + discount endpoints.
 * Used to sync the storefront's local (`zustand`) cart into the real server-side cart
 * right before anything that evaluates `abzar/api`'s own cart — discount validation and
 * checkout-start both do, and the local cart is otherwise the only source of truth.
 */
export const cartApi = {
  clear: () => apiClient.delete('/storefront/cart', cartViewSchema),

  addItem: (variantId: string, qty: number) =>
    apiClient.post('/storefront/cart/items', cartViewSchema, { body: { variantId, qty } }),

  validateDiscount: (code: string) =>
    apiClient.post('/storefront/discounts/validate', discountValidationSchema, { body: { code } }),
};

/** Replaces the real server-side cart with exactly these lines (clear, then re-add each). */
export async function syncCartToServer(lines: Array<{ variantId: string; qty: number }>): Promise<void> {
  await cartApi.clear();
  for (const line of lines) {
    await cartApi.addItem(line.variantId, line.qty);
  }
}
