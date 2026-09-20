'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';

import {
  addressListSchema,
  addressSchema,
  type CreateAddressInput,
  type UpdateAddressInput,
} from '../services/checkout-address.schemas';

const ADDRESSES_QUERY_KEY = ['checkout', 'addresses'];

/** Extracts a Persian-friendly message from a failed BFF response. */
async function readErrorMessage(res: Response, fallback: string) {
  const payload: unknown = await res.json().catch(() => null);
  return (
    (payload as { message?: string; error?: string } | null)?.message ??
    (payload as { message?: string; error?: string } | null)?.error ??
    fallback
  );
}

/** Reads the signed-in customer's saved addresses from the BFF route. */
export function useAddresses() {
  return useQuery({
    queryKey: ADDRESSES_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch('/api/checkout/addresses', { credentials: 'same-origin' });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error('Failed to load addresses');
      return addressListSchema.parse(await res.json());
    },
    staleTime: 60 * 1000,
  });
}

/** Creates a new address and refreshes the list on success. */
export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateAddressInput) => {
      const res = await fetch('/api/checkout/addresses', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to create address'));
      return addressSchema.parse(await res.json());
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}

/** Updates an existing address and refreshes the list on success. */
export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: UpdateAddressInput }) => {
      const res = await fetch(`/api/checkout/addresses/${id}`, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to update address'));
      return addressSchema.parse(await res.json());
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}

/** Deletes an address and refreshes the list on success. */
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/checkout/addresses/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error(await readErrorMessage(res, 'Failed to delete address'));
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ADDRESSES_QUERY_KEY });
    },
  });
}
