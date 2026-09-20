import 'server-only';

import { apiClient } from '@/lib/api-client';

import { loyaltySummarySchema } from './loyalty.schemas';

/** Server-only wrapper over `abzar/api`'s authenticated, owner-scoped loyalty endpoint. */
export const loyaltyApi = {
  summary: (params: { skip?: number; take?: number } = {}) => {
    const query = new URLSearchParams();
    if (params.skip !== undefined) query.set('skip', String(params.skip));
    if (params.take !== undefined) query.set('take', String(params.take));
    const qs = query.toString();
    return apiClient.get(`/storefront/loyalty${qs ? `?${qs}` : ''}`, loyaltySummarySchema, {
      next: { revalidate: 0 },
    });
  },
};
