import { NextResponse } from 'next/server';
import { z } from 'zod';

import { ApiError } from '@/lib/api-client';
import { REGEX } from '@/constants/regex';
import { authApi } from '@/features/auth/services/auth.api';
import { setSessionCookie } from '@/lib/session';

const bodySchema = z.object({
  mobile: z.string().trim().regex(REGEX.phoneIR, 'شماره موبایل معتبر نیست'),
  code: z.string().trim().regex(REGEX.otp5, 'کد باید ۵ رقم باشد'),
});

/**
 * BFF: verifies an OTP code and, on success, sets the real HttpOnly session cookie
 * from `abzar/api`'s access token. The refresh token is not forwarded to the client —
 * no silent-refresh flow is wired yet, so the session simply expires after `expiresIn`.
 */
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
    const result = await authApi.verifyOtp(parsed.data.mobile, parsed.data.code);
    await setSessionCookie(result.accessToken, result.expiresIn);
    return NextResponse.json({ isNewUser: result.isNewUser, user: result.user });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : 'تأیید کد ناموفق بود';
    return NextResponse.json({ message }, { status });
  }
}
