import 'server-only';

import { apiClient } from '@/lib/api-client';

import { z } from 'zod';

import {
  addressListSchema,
  addressSchema,
  type CreateAddressInput,
  type UpdateAddressInput,
} from './checkout-address.schemas';

/** Server-only fetchers for the authenticated customer's saved addresses. */
export const checkoutAddressApi = {
  list: () => apiClient.get('/storefront/addresses', addressListSchema),
  create: (input: CreateAddressInput) =>
    apiClient.post('/storefront/addresses', addressSchema, { body: input }),
  update: (id: string, input: UpdateAddressInput) =>
    apiClient.patch(`/storefront/addresses/${id}`, addressSchema, { body: input }),
  remove: (id: string) => apiClient.delete(`/storefront/addresses/${id}`, z.unknown()),
};
