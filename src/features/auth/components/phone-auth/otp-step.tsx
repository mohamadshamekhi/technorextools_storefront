'use client';

import { useEffect, useState } from 'react';

import { Icon } from '@/components/atoms';
import { useOtpInputs } from '@/features/auth/hooks/use-otp-inputs';
import type { PhoneAuthController } from '@/features/auth/hooks/use-phone-auth';
import { OTP_LENGTH } from '@/features/auth/types/phone-auth';
import { formatPhoneFa } from '@/features/auth/utils/format-fa';
import { AuthError } from './auth-error';
import { OtpInputs } from './otp-inputs';
import { ResendControl } from './resend-control';
import { StepHeading } from './step-heading';

export function OtpStep({ auth }: { auth: PhoneAuthController }) {
  const [shake, setShake] = useState(false);
  const { inputProps, reset, focusFirst } = useOtpInputs({
    length: OTP_LENGTH,
    onComplete: auth.verifyCode,
  });

  useEffect(() => {
    if (auth.failures === 0) return;
    reset();
    setShake(true);
    const id = window.setTimeout(() => setShake(false), 400);
    return () => window.clearTimeout(id);
  }, [auth.failures, reset]);

  return (
    <div>
      <button
        type="button"
        onClick={auth.backToPhone}
        className="text-foreground-muted hover:text-brand-600 mb-5 flex items-center gap-1.5 text-[12.5px] font-semibold"
      >
        <Icon name="arrowStart" className="size-3.5 rotate-180" />
        تغییر شماره موبایل
      </button>

      <StepHeading
        icon="lock"
        tint="oklch(0.94 0.035 250)"
        ink="oklch(0.53 0.16 250)"
        title="کد تأیید را وارد کنید"
      >
        کد ۵ رقمی ارسال‌شده به{' '}
        <span dir="ltr" className="font-display text-foreground inline-block font-bold">
          {formatPhoneFa(auth.phone)}
        </span>{' '}
        را وارد کنید.
      </StepHeading>

      <OtpInputs inputs={inputProps} invalid={Boolean(auth.otpError)} shake={shake} />
      <AuthError message={auth.otpError} align="center" />

      <ResendControl
        canResend={auth.resend.canResend}
        remaining={auth.resend.remaining}
        onResend={() => {
          reset();
          focusFirst();
          void auth.resendCode();
        }}
      />
    </div>
  );
}
