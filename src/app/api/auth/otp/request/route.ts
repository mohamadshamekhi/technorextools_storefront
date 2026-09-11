import { NextResponse } from 'next/server';
import { z } from 'zod';

import { ApiError } from '@/lib/api-client';
import { REGEX } from '@/constants/regex';
import { authApi } from '@/features/auth/services/auth.api';

const bodySchema = z.object({
  mobile: z.string().trim().regex(REGEX.phoneIR, 'شماره موبایل معتبر نیست'),
  referralCode: z.string().trim().min(4).max(16).optional(),
});

/** BFF: requests an OTP code for a mobile number. Unauthenticated. */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const result = await authApi.requestOtp(parsed.data.mobile, parsed.data.referralCode);
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : 'ارسال کد ناموفق بود';
    return NextResponse.json({ message }, { status });
  }
}
