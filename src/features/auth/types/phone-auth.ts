import { z } from 'zod';

import { REGEX } from '@/constants/regex';

/** Steps of the phone / OTP sign-in flow, in order. */
export const AUTH_STEPS = ['phone', 'otp', 'profile', 'done'] as const;
export type AuthStep = (typeof AUTH_STEPS)[number];

export const OTP_LENGTH = 5;
/** Seconds before "resend code" becomes available again. */
export const RESEND_SECONDS = 90;

export const phoneSchema = z
  .string()
  .regex(REGEX.phoneIR, 'شماره موبایل را به‌درستی وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)');

export const otpSchema = z.string().regex(REGEX.otp5, 'کد تأیید باید ۵ رقم باشد');

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, 'نام و نام خانوادگی را وارد کنید').max(80),
  email: z.union([z.string().regex(REGEX.email, 'ایمیل معتبر نیست'), z.literal('')]),
});

export type ProfileInput = z.infer<typeof profileSchema>;

/** Result of verifying an OTP — tells the flow whether to collect a profile. */
export type OtpVerification = { isNewUser: boolean };
