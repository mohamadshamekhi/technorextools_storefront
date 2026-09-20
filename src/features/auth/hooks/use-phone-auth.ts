'use client';

import { useCallback, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
  phoneSchema,
  RESEND_SECONDS,
  type AuthStep,
  type ProfileInput,
} from '@/features/auth/types/phone-auth';
import { requestOtp, updateProfile, verifyOtp } from '@/features/auth/services/phone-auth.service';
import { useResendTimer } from './use-resend-timer';

/**
 * State machine behind the phone / OTP sign-in flow — talks to the real `abzar/api`
 * OTP endpoints through the same-origin BFF routes (`phone-auth.service.ts`). The BFF
 * sets the HttpOnly session cookie itself on a successful verify; there is no local
 * "persist session" step here.
 */
export function usePhoneAuth() {
  const queryClient = useQueryClient();
  const [step, setStep] = useState<AuthStep>('phone');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [failures, setFailures] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);
  const [busy, setBusy] = useState(false);
  const resend = useResendTimer(RESEND_SECONDS);

  const changePhone = useCallback((value: string) => {
    setPhone(value.replace(/\D/g, '').slice(0, 11));
    setPhoneError('');
  }, []);

  const submitPhone = useCallback(async () => {
    const parsed = phoneSchema.safeParse(phone);
    if (!parsed.success) {
      setPhoneError(parsed.error.issues[0]?.message ?? 'شماره نامعتبر است');
      return;
    }
    setBusy(true);
    try {
      const { resendAfter } = await requestOtp(parsed.data);
      setOtpError('');
      setStep('otp');
      resend.restart(resendAfter);
    } catch (error) {
      setPhoneError(error instanceof Error ? error.message : 'ارسال کد ناموفق بود');
    } finally {
      setBusy(false);
    }
  }, [phone, resend]);

  const backToPhone = useCallback(() => {
    resend.stop();
    setStep('phone');
  }, [resend]);

  const verifyCode = useCallback(
    async (code: string): Promise<boolean> => {
      setBusy(true);
      try {
        const { isNewUser: isNew } = await verifyOtp(phone, code);
        resend.stop();
        setIsNewUser(isNew);
        setStep(isNew ? 'profile' : 'done');
        // The session cookie was just set server-side — refetch `useCurrentUser` everywhere.
        void queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
        return true;
      } catch (error) {
        setOtpError(error instanceof Error ? error.message : 'کد نامعتبر است');
        setFailures((count) => count + 1);
        return false;
      } finally {
        setBusy(false);
      }
    },
    [phone, resend, queryClient],
  );

  const resendCode = useCallback(async () => {
    setOtpError('');
    try {
      const { resendAfter } = await requestOtp(phone);
      resend.restart(resendAfter);
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : 'ارسال مجدد ناموفق بود');
    }
  }, [phone, resend]);

  const finishProfile = useCallback(
    async (input: ProfileInput) => {
      setBusy(true);
      try {
        await updateProfile({ fullName: input.fullName, email: input.email || null });
      } catch {
        /* best-effort — the account page can retry this edit later */
      } finally {
        setBusy(false);
        setStep('done');
        void queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      }
    },
    [queryClient],
  );

  return {
    step,
    phone,
    phoneError,
    otpError,
    failures,
    isNewUser,
    busy,
    resend,
    changePhone,
    submitPhone,
    backToPhone,
    verifyCode,
    resendCode,
    finishProfile,
  };
}

export type PhoneAuthController = ReturnType<typeof usePhoneAuth>;
