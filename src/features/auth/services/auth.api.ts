import 'server-only';

import { z } from 'zod';

import { apiClient } from '@/lib/api-client';
import { authResultSchema, authUserSchema, otpRequestResultSchema } from '@/features/auth/types';

/** Thin, typed wrappers over `abzar/api`'s mobile/OTP auth endpoints. */
export const authApi = {
  requestOtp: (mobile: string, referralCode?: string) =>
    apiClient.post('/auth/otp/request', otpRequestResultSchema, {
      body: { mobile, referralCode },
      auth: false,
    }),

  verifyOtp: (mobile: string, code: string, cartToken?: string) =>
    apiClient.post('/auth/otp/verify', authResultSchema, {
      body: { mobile, code, cartToken },
      auth: false,
    }),

  me: () => apiClient.get('/auth/me', authUserSchema, { next: { revalidate: 0 } }),

  updateProfile: (input: { fullName?: string; email?: string | null }) =>
    apiClient.patch('/auth/me', authUserSchema, { body: input }),

  logout: () => apiClient.post('/auth/logout', z.null()),
};
