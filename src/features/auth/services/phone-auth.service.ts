import type { OtpVerification } from '@/features/auth/types/phone-auth';

/**
 * Client-side calls into the same-origin BFF routes under `src/app/api/auth/*`, which
 * proxy `abzar/api`'s real mobile/OTP endpoints. No mock data, no client-side session
 * state — the BFF sets the HttpOnly session cookie itself on a successful verify.
 */

async function parseErrorMessage(res: Response, fallback: string): Promise<string> {
  const payload: unknown = await res.json().catch(() => null);
  const body = payload as { message?: string; error?: string } | null;
  return body?.message ?? body?.error ?? fallback;
}

export async function requestOtp(mobile: string): Promise<{ resendAfter: number }> {
  const res = await fetch('/api/auth/otp/request', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile }),
  });
  if (!res.ok)
    throw new Error(await parseErrorMessage(res, 'ارسال کد ناموفق بود. دوباره تلاش کنید.'));
  return (await res.json()) as { resendAfter: number };
}

export async function verifyOtp(mobile: string, code: string): Promise<OtpVerification> {
  const res = await fetch('/api/auth/otp/verify', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobile, code }),
  });
  if (!res.ok)
    throw new Error(await parseErrorMessage(res, 'کد وارد شده صحیح نیست. دوباره تلاش کنید.'));
  return (await res.json()) as OtpVerification;
}

export async function updateProfile(input: {
  fullName: string;
  email: string | null;
}): Promise<void> {
  const res = await fetch('/api/auth/me', {
    method: 'PATCH',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await parseErrorMessage(res, 'ثبت اطلاعات ناموفق بود.'));
}
