import 'server-only';

import { apiClient } from '@/lib/api-client';

import { addressListSchema, addressSchema, type CreateAddressInput } from './checkout-address.schemas';

/** Server-only fetchers for the authenticated customer's saved addresses. */
export const checkoutAddressApi = {
  list: () => apiClient.get('/storefront/addresses', addressListSchema),
  create: (input: CreateAddressInput) =>
    apiClient.post('/storefront/addresses', addressSchema, { body: input }),
};
