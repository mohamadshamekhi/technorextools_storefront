import 'server-only';

import type { RepairDecisionValues } from '@/features/repairs';
import { repairRequestSchema } from '@/features/repairs';
import { apiClient } from '@/lib/api-client';

import { repairListSchema } from './repairs.schemas';

/** Server-only wrappers over `abzar/api`'s authenticated, owner-scoped repair endpoints. */
export const repairsApi = {
  list: (params: { skip?: number; take?: number } = {}) => {
    const query = new URLSearchParams();
    if (params.skip !== undefined) query.set('skip', String(params.skip));
    if (params.take !== undefined) query.set('take', String(params.take));
    const qs = query.toString();
    return apiClient.get(`/storefront/repairs${qs ? `?${qs}` : ''}`, repairListSchema, {
      next: { revalidate: 0 },
    });
  },

  detail: (id: string) =>
    apiClient.get(`/storefront/repairs/${encodeURIComponent(id)}`, repairRequestSchema, {
      next: { revalidate: 0 },
    }),

  /** Customer's answer to a cost estimate. Upstream rejects anything but
   * `awaiting_customer` + a non-null `estimatedCost` with a Persian `409`. */
  decision: (id: string, body: RepairDecisionValues) =>
    apiClient.post(`/storefront/repairs/${encodeURIComponent(id)}/decision`, repairRequestSchema, {
      body,
    }),
};
