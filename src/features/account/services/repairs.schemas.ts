import { z } from 'zod';

import { repairRequestSchema } from '@/features/repairs';

/** Zod mirror of `GET /storefront/repairs` (`storefront-repairs.service.ts` → `list`). */
export const repairListSchema = z.object({
  items: z.array(repairRequestSchema),
  total: z.number(),
  skip: z.number(),
  take: z.number(),
});

export type RepairList = z.infer<typeof repairListSchema>;
