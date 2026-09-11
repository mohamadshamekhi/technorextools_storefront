import 'server-only';

import { apiClient } from '@/lib/api-client';

import { orderDetailSchema, orderListSchema } from './orders.schemas';

/** Server-only wrappers over `abzar/api`'s authenticated, owner-scoped orders endpoints. */
export const ordersApi = {
  list: (params: { skip?: number; take?: number } = {}) => {
    const query = new URLSearchParams();
    if (params.skip !== undefined) query.set('skip', String(params.skip));
    if (params.take !== undefined) query.set('take', String(params.take));
    const qs = query.toString();
    return apiClient.get(`/storefront/orders${qs ? `?${qs}` : ''}`, orderListSchema, {
      next: { revalidate: 0 },
    });
  },

  detail: (orderNumber: string) =>
    apiClient.get(`/storefront/orders/${encodeURIComponent(orderNumber)}`, orderDetailSchema, {
      next: { revalidate: 0 },
    }),
};
