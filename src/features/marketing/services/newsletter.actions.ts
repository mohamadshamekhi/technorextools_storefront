'use server';

import { z } from 'zod';

import { REGEX } from '@/constants/regex';
import { ApiError, apiClient } from '@/lib/api-client';
import type { ActionResult } from '@/types';

/** Accepts either an email or an Iranian mobile number. */
const contactSchema = z.object({
  contact: z
    .string()
    .trim()
    .min(1, 'ایمیل یا شماره موبایل را وارد کنید')
    .refine(
      (value) => REGEX.email.test(value) || /^0?9\d{9}$/.test(value.replace(/[^\d]/g, '')),
      'قالب ایمیل یا شماره موبایل معتبر نیست',
    ),
});

/** `created: false` means the contact was already subscribed — still a success. */
const resultSchema = z.object({ created: z.boolean() });

export type NewsletterState = ActionResult<{ created: boolean }>;

/** Newsletter opt-in → `POST /storefront/newsletter`. */
export async function subscribeToNewsletter(
  _prev: NewsletterState | null,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = contactSchema.safeParse({ contact: formData.get('contact') });

  if (!parsed.success) {
    return {
      ok: false,
      error: 'ورودی نامعتبر است',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await apiClient.post('/storefront/newsletter', resultSchema, {
      auth: false,
      body: parsed.data,
    });
    return { ok: true, data: { created: result.created } };
  } catch (error) {
    const message =
      error instanceof ApiError && error.status === 429
        ? 'تعداد درخواست‌ها زیاد است. کمی بعد دوباره تلاش کنید.'
        : 'ثبت عضویت ناموفق بود. دوباره تلاش کنید.';
    return { ok: false, error: message, fieldErrors: { contact: [message] } };
  }
}
