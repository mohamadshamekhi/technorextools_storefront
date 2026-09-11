'use client';

import Link from 'next/link';

import { routes } from '@/config/routes';
import type { PhoneAuthController } from '@/features/auth/hooks/use-phone-auth';
import { AuthError } from './auth-error';
import { AuthField } from './auth-field';
import { AuthSubmit } from './auth-submit';
import { StepHeading } from './step-heading';

export function PhoneStep({ auth }: { auth: PhoneAuthController }) {
  return (
    <div>
      <StepHeading
        icon="phone"
        tint="oklch(0.95 0.035 45)"
        ink="oklch(0.6 0.19 45)"
        title="ورود یا ثبت‌نام"
      >
        شماره موبایل خود را وارد کنید تا کد تأیید یک‌بارمصرف برایتان ارسال شود.
      </StepHeading>

      <AuthField
        label="شماره موبایل"
        icon="phone"
        type="tel"
        inputMode="numeric"
        dir="ltr"
        maxLength={11}
        placeholder="0912 345 6789"
        value={auth.phone}
        invalid={Boolean(auth.phoneError)}
        onChange={(event) => auth.changePhone(event.target.value)}
        className="text-center tracking-[0.2em]"
      />
      <AuthError message={auth.phoneError} />

      <AuthSubmit onClick={auth.submitPhone} busy={auth.busy} withArrow>
        دریافت کد تأیید
      </AuthSubmit>

      <p className="text-foreground-muted mt-5 text-center text-[11.5px] leading-loose">
        با ادامه،{' '}
        <Link href={routes.about} className="text-brand-600">
          قوانین و مقررات
        </Link>{' '}
        تکنورکس را می‌پذیرید.
      </p>
    </div>
  );
}
