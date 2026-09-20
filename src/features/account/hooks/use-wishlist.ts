'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';

import { wishlistListSchema } from '../services/wishlist.schemas';

const WISHLIST_QUERY_KEY = ['account', 'wishlist'];

/** Reads the signed-in customer's wishlist from the BFF route. */
export function useWishlist() {
  return useQuery({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch('/api/account/wishlist', { credentials: 'same-origin' });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error('Failed to load wishlist');
      return wishlistListSchema.parse(await res.json());
    },
    staleTime: 60 * 1000,
  });
}

/** Adds a product to the wishlist and refreshes the list on success. */
export function useAddWishlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch('/api/account/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ productId }),
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error('Failed to add to wishlist');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
}

/** Removes an item from the wishlist and refreshes the list on success. */
export function useRemoveWishlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch(`/api/account/wishlist/${productId}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error('Failed to remove from wishlist');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
}
