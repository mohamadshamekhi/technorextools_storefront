import type { OtpVerification } from '@/features/auth/types/phone-auth';

/**
 * Mock phone / OTP backend. Swap each call for a same-origin BFF route
 * (`src/app/api/auth/*`) or Server Action once `abzar/api` is wired — the
 * signatures are chosen to survive that move unchanged.
 */

/** Demo: this number is treated as an already-registered account. */
const KNOWN_PHONE = '09121234567';
/** Demo: entering this code is always rejected. */
const REJECTED_OTP = '00000';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function requestOtp(phone: string): Promise<void> {
  await wait(600);
  void phone;
}

export async function verifyOtp(phone: string, code: string): Promise<OtpVerification> {
  await wait(500);
  if (code === REJECTED_OTP) {
    throw new Error('کد وارد شده صحیح نیست. دوباره تلاش کنید.');
  }
  return { isNewUser: phone !== KNOWN_PHONE };
}

export async function persistSession(): Promise<void> {
  try {
    localStorage.setItem('pumaair_auth_token', `demo-${Date.now()}`);
  } catch {
    /* storage unavailable — the real flow sets an HttpOnly cookie server-side */
  }
}
