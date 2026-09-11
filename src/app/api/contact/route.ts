import { NextResponse } from 'next/server';
import { z } from 'zod';

import { CONTACT_SUBJECTS } from '@/features/contact/types';

/**
 * Contact form BFF. `abzar/api` has no public enquiry endpoint yet, so this
 * only validates and logs. TODO: forward to `abzar/api` once it exists.
 */
const payloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/),
  subject: z.enum(CONTACT_SUBJECTS).optional(),
  message: z.string().trim().min(5).max(4000),
});

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  console.warn('[contact] TODO wire to abzar/api', {
    name: parsed.data.name,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
  });

  return NextResponse.json({ status: 'received' }, { status: 202 });
}
