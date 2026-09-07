import { z } from 'zod';

export const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

/** Envelope every `abzar/api` list endpoint returns. */
export const paginatedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    data: z.array(item),
    meta: paginationMetaSchema,
  });

export const apiErrorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  fieldErrors: z.record(z.array(z.string())).optional(),
});

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
export type ApiErrorResponse = z.infer<typeof apiErrorSchema>;
export type Paginated<T> = { data: T[]; meta: PaginationMeta };
