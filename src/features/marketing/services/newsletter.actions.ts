'use server';

import { z } from 'zod';

import { REGEX } from '@/constants/regex';
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

export type NewsletterState = ActionResult<{ contact: string }>;

/**
 * Newsletter opt-in. Validates on the server, then hands off to
 * `abzar/api` (wire the real call when the endpoint exists).
 */
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

  return { ok: true, data: { contact: parsed.data.contact } };
}
