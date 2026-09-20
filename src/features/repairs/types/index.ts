import { z } from 'zod';

/**
 * Repair-request payload. Mirrors `POST /storefront/repairs` in `abzar/api`
 * (`storefront-repairs.controller.ts`) — keep the bounds in sync.
 */
export const repairFormSchema = z.object({
  issueDescription: z
    .string()
    .trim()
    .min(10, 'شرح مشکل را کامل‌تر بنویسید (حداقل ۱۰ نویسه)')
    .max(2000, 'شرح مشکل بیش از حد طولانی است'),
  warrantySerial: z
    .string()
    .trim()
    .max(120, 'سریال گارانتی نامعتبر است')
    .optional()
    .or(z.literal('')),
});

export type RepairFormValues = z.infer<typeof repairFormSchema>;

export const REPAIR_STATUSES = ['received', 'in_progress', 'done'] as const;
export type RepairStatus = (typeof REPAIR_STATUSES)[number];

/** `abzar/api` repair view returned by the BFF route. */
export const repairRequestSchema = z.object({
  id: z.string(),
  issueDescription: z.string(),
  status: z.enum(REPAIR_STATUSES),
  warrantySerial: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type RepairRequest = z.infer<typeof repairRequestSchema>;
