'use client';

import { useState } from 'react';

import type { PhoneAuthController } from '@/features/auth/hooks/use-phone-auth';
import { profileSchema } from '@/features/auth/types/phone-auth';
import { AuthError } from './auth-error';
import { AuthField } from './auth-field';
import { AuthSubmit } from './auth-submit';
import { StepHeading } from './step-heading';

export function ProfileStep({ auth }: { auth: PhoneAuthController }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  const submit = async () => {
    const parsed = profileSchema.safeParse({ fullName, email });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({ fullName: flat.fullName?.[0], email: flat.email?.[0] });
      return;
    }
    await auth.finishProfile(parsed.data);
  };

  return (
    <div>
      <StepHeading
        icon="userPlus"
        tint="oklch(0.95 0.04 150)"
        ink="oklch(0.5 0.14 155)"
        title="تکمیل ثبت‌نام"
      >
        خوش آمدید! برای تکمیل حساب کاربری، اطلاعات زیر را وارد کنید.
      </StepHeading>

      <div className="flex flex-col gap-4">
        <div>
          <AuthField
            label="نام و نام خانوادگی"
            placeholder="مثلاً علی رضایی"
            value={fullName}
            invalid={Boolean(errors.fullName)}
            onChange={(event) => setFullName(event.target.value)}
          />
          <AuthError message={errors.fullName ?? ''} />
        </div>
        <div>
          <AuthField
            label="ایمیل (اختیاری)"
            type="email"
            dir="ltr"
            placeholder="example@mail.com"
            value={email}
            invalid={Boolean(errors.email)}
            onChange={(event) => setEmail(event.target.value)}
            className="text-start"
          />
          <AuthError message={errors.email ?? ''} />
        </div>
      </div>

      <AuthSubmit onClick={submit} busy={auth.busy}>
        تکمیل ثبت‌نام و ورود
      </AuthSubmit>
    </div>
  );
}
