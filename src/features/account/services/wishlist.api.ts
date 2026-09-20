import 'server-only';

import { z } from 'zod';

import { apiClient } from '@/lib/api-client';

import {
  addToWishlistResultSchema,
  wishlistListSchema,
  type AddToWishlistInput,
} from './wishlist.schemas';

/** Server-only wrappers over `abzar/api`'s authenticated, owner-scoped wishlist endpoints. */
export const wishlistApi = {
  list: () =>
    apiClient.get('/storefront/wishlist', wishlistListSchema, {
      next: { revalidate: 0 },
    }),
  add: (input: AddToWishlistInput) =>
    apiClient.post('/storefront/wishlist', addToWishlistResultSchema, { body: input }),
  remove: (productId: string) => apiClient.delete(`/storefront/wishlist/${productId}`, z.unknown()),
};
