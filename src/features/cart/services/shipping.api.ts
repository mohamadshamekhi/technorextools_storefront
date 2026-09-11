import 'server-only';

import { apiClient } from '@/lib/api-client';

import { shippingMethodListSchema } from './shipping.schemas';

/** Server-only fetcher for the public shipping-method list. Unauthenticated, ISR-cached. */
export function listShippingMethods() {
  return apiClient.get('/storefront/shipping/methods', shippingMethodListSchema, {
    auth: false,
    next: { revalidate: 300, tags: ['cart:shipping-methods'] },
  });
}
