import 'server-only';

import { apiClient } from '@/lib/api-client';

import { activeDiscountListSchema } from './discounts.schemas';

/** Server-only wrapper over `abzar/api`'s authenticated, owner-scoped discounts endpoint. */
export const discountsApi = {
  active: () =>
    apiClient.get('/storefront/discounts/active', activeDiscountListSchema, {
      next: { revalidate: 0 },
    }),
};
