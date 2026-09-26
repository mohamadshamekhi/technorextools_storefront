import { NextResponse } from 'next/server';
import { z } from 'zod';

import { CONTACT_SUBJECTS } from '@/features/contact/types';
import { ApiError, apiClient } from '@/lib/api-client';

/** BFF for `POST /storefront/contact` — guest enquiry, lands in the admin panel. */
const payloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/),
  subject: z.enum(CONTACT_SUBJECTS).optional(),
  message: z.string().trim().min(5).max(4000),
});

const resultSchema = z.object({ id: z.string() });

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const result = await apiClient.post('/storefront/contact', resultSchema, {
      auth: false,
      body: parsed.data,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    if (status === 429) {
      return NextResponse.json(
        { error: 'تعداد پیام‌ها زیاد است. یک دقیقه بعد دوباره تلاش کنید.' },
        { status: 429 },
      );
    }
    if (status === 400) {
      return NextResponse.json({ error: 'ورودی نامعتبر است' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'ارسال پیام ناموفق بود. دوباره تلاش کنید.' },
      { status: 502 },
    );
  }
}
