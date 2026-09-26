import { z } from 'zod';

/** Zod mirrors of `abzar/api`'s `/storefront/catalog/products/{slug}/comments` views. */

export const productCommentsSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      authorName: z.string().nullable(),
      rating: z.number(),
      body: z.string(),
      createdAt: z.string(),
    }),
  ),
  total: z.number(),
  skip: z.number(),
  take: z.number(),
  averageRating: z.number().nullable(),
});

/** Body of `POST /storefront/catalog/products/{slug}/comments` — rating 1..5 + text. */
export const createCommentSchema = z.object({
  rating: z.number().int().min(1, 'امتیاز را انتخاب کنید').max(5),
  body: z
    .string()
    .trim()
    .min(10, 'دیدگاه باید دست‌کم ۱۰ نویسه باشد')
    .max(1000, 'دیدگاه حداکثر ۱۰۰۰ نویسه است'),
});

/** `abzar/api` answers a new comment with its moderation status. */
export const createCommentResultSchema = z.object({ status: z.string() });
