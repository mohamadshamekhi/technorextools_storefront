import 'server-only';

import { apiClient } from '@/lib/api-client';

import { cartViewSchema, discountValidationSchema, type CartSyncLine } from './cart.schemas';

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

  addSparePart: (sparePartId: string, qty: number) =>
    apiClient.post('/storefront/cart/spare-parts', cartViewSchema, {
      body: { sparePartId, qty },
    }),

  validateDiscount: (code: string) =>
    apiClient.post('/storefront/discounts/validate', discountValidationSchema, { body: { code } }),
};

/** Replaces the real server-side cart with exactly these lines (clear, then re-add each). */
export async function syncCartToServer(lines: CartSyncLine[]): Promise<void> {
  await cartApi.clear();
  for (const line of lines) {
    if ('sparePartId' in line) await cartApi.addSparePart(line.sparePartId, line.qty);
    else await cartApi.addItem(line.variantId, line.qty);
  }
}
