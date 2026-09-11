import { z } from 'zod';

export * from './phone-auth';

/**
 * Mirrors `abzar/api`'s `UserView` (`GET/PATCH /auth/me`, embedded in the OTP-verify
 * response). Source: `../api/src/modules/auth/auth.service.ts`.
 */
export const authUserSchema = z.object({
  id: z.string(),
  fullName: z.string().nullable(),
  mobile: z.string(),
  email: z.string().nullable(),
  role: z.string(),
  referralCode: z.string(),
});

/** `POST /auth/otp/request` response. */
export const otpRequestResultSchema = z.object({
  expiresIn: z.number().int().positive(),
  resendAfter: z.number().int().positive(),
  /** Only present when `abzar/api`'s `OTP_DEV_ECHO` is on — never in production. */
  devCode: z.string().optional(),
});

/** `POST /auth/otp/verify` response. */
export const authResultSchema = z.object({
  accessToken: z.string().min(10),
  expiresIn: z.number().int().positive(),
  refreshToken: z.string().min(1),
  isNewUser: z.boolean(),
  user: authUserSchema,
});

export type AuthUser = z.infer<typeof authUserSchema>;
export type OtpRequestResult = z.infer<typeof otpRequestResultSchema>;
export type AuthResult = z.infer<typeof authResultSchema>;
