'use client';

import { useCallback, useState } from 'react';

import {
  phoneSchema,
  RESEND_SECONDS,
  type AuthStep,
} from '@/features/auth/types/phone-auth';
import {
  persistSession,
  requestOtp,
  verifyOtp,
} from '@/features/auth/services/phone-auth.service';
import { useResendTimer } from './use-resend-timer';

/** State machine behind the phone / OTP sign-in flow. */
export function usePhoneAuth() {
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
    await requestOtp(parsed.data);
    setBusy(false);
    setOtpError('');
    setStep('otp');
    resend.restart();
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
        await persistSession();
        resend.stop();
        setIsNewUser(isNew);
        setStep(isNew ? 'profile' : 'done');
        return true;
      } catch (error) {
        setOtpError(error instanceof Error ? error.message : 'کد نامعتبر است');
        setFailures((count) => count + 1);
        return false;
      } finally {
        setBusy(false);
      }
    },
    [phone, resend],
  );

  const resendCode = useCallback(async () => {
    setOtpError('');
    await requestOtp(phone);
    resend.restart();
  }, [phone, resend]);

  const finishProfile = useCallback(() => setStep('done'), []);

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
