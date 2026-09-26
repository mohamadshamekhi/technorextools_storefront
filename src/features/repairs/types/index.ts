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

/** `abzar/api` caps repair attachments at 5 media ids from `media/upload`. */
export const MAX_REPAIR_ATTACHMENTS = 5;

export const repairAttachmentSchema = z.object({
  id: z.string(),
  url: z.string(),
  contentType: z.string(),
  originalName: z.string().nullable().optional(),
});

/** `abzar/api`'s `RepairStatus` enum, in pipeline order (`prisma/schema.prisma`).
 * `canceled` is terminal and off the happy path. */
export const REPAIR_STATUSES = [
  'received',
  'reviewing',
  'awaiting_customer',
  'awaiting_parts',
  'in_progress',
  'done',
  'delivered',
  'canceled',
] as const;
export type RepairStatus = (typeof REPAIR_STATUSES)[number];

/** One row of `RepairRequest.statusHistory` — oldest first; `statusLabel` is Persian from the API. */
export const repairStatusEntrySchema = z.object({
  status: z.enum(REPAIR_STATUSES),
  statusLabel: z.string(),
  at: z.string(),
  note: z.string().nullable().default(null),
  /** Who moved the request into this status. Added by `abzar/api` after the customer-decision
   * endpoint; older rows come back as `admin`/`system`. */
  by: z.enum(['admin', 'customer', 'system']).default('admin'),
});

/** `POST /storefront/repairs/:id/decision` body — the customer's answer to a cost estimate. */
export const repairDecisionSchema = z.object({
  decision: z.enum(['approve', 'reject']),
  note: z.string().trim().max(500, 'توضیح حداکثر ۵۰۰ نویسه است').nullable().optional(),
});

export type RepairDecisionValues = z.infer<typeof repairDecisionSchema>;

/** `abzar/api` repair view returned by the BFF route. */
export const repairRequestSchema = z.object({
  id: z.string(),
  issueDescription: z.string(),
  status: z.enum(REPAIR_STATUSES),
  /** Persian label from the API — never re-derive it client-side. */
  statusLabel: z.string(),
  warrantySerial: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  attachments: z.array(repairAttachmentSchema).default([]),
  statusHistory: z.array(repairStatusEntrySchema).default([]),
  /** Technician's verdict once reviewed — `null` until the backoffice records it. */
  technicianNote: z.string().nullable().default(null),
  /** Estimated repair cost in toman, `null` until quoted. */
  estimatedCost: z.number().int().nullable().default(null),
});

export type RepairRequest = z.infer<typeof repairRequestSchema>;
export type RepairAttachment = z.infer<typeof repairAttachmentSchema>;
export type RepairStatusEntry = z.infer<typeof repairStatusEntrySchema>;
