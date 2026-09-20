'use client';

import { useEffect, useId, useState } from 'react';

import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';
import type { SessionUser } from '@/lib/session';
import { useCurrentUser } from '@/features/auth';

import { useUpdateProfile } from '../hooks/use-update-profile';

const field =
  'border-hairline focus:border-brand-500 focus:ring-brand-500/15 w-full rounded-xl border px-3.5 py-3 text-[14px] outline-none transition-shadow focus:ring-2';
const fieldInvalid = 'border-sale focus:border-sale focus:ring-sale/15';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Signed-in customer's name/email edit form, backed by `PATCH /api/auth/me`. */
export function AccountForm({ user }: { user: SessionUser }) {
  const { data: currentUser } = useCurrentUser();
  const [fullName, setFullName] = useState(user.name ?? '');
  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const emailErrorId = useId();
  const mutation = useUpdateProfile();

  useEffect(() => {
    if (!currentUser) return;
    if (!fullNameTouched) setFullName(currentUser.fullName ?? '');
    if (!emailTouched) setEmail(currentUser.email ?? '');
  }, [currentUser, fullNameTouched, emailTouched]);

  function validateEmail(value: string) {
    if (value.trim() !== '' && !EMAIL_PATTERN.test(value.trim())) {
      setEmailError('ایمیل نامعتبر است');
      return false;
    }
    setEmailError(null);
    return true;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);
    if (!validateEmail(email)) return;

    mutation.mutate(
      { fullName: fullName.trim(), email: email.trim() === '' ? null : email.trim() },
      {
        onSuccess: () => {
          setSuccess(true);
          setFullNameTouched(false);
          setEmailTouched(false);
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-hairline bg-surface flex max-w-xl flex-col gap-4 rounded-2xl border p-6 shadow-sm"
    >
      <label className="text-[12px] font-bold">
        <span className="text-foreground-muted mb-1.5 block">نام و نام خانوادگی</span>
        <input
          className={field}
          value={fullName}
          onChange={(e) => {
            setFullNameTouched(true);
            setFullName(e.target.value);
          }}
          minLength={2}
          maxLength={120}
          required
        />
      </label>
      <label className="text-[12px] font-bold">
        <span className="text-foreground-muted mb-1.5 block">شماره موبایل</span>
        <input
          dir="ltr"
          className={`${field} bg-surface-sunken font-display text-foreground-muted`}
          value={toPersianDigits(user.mobile)}
          disabled
        />
      </label>
      <label className="text-[12px] font-bold">
        <span className="text-foreground-muted mb-1.5 block">ایمیل (اختیاری)</span>
        <input
          className={cn(field, emailError && fieldInvalid)}
          dir="ltr"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => {
            setEmailTouched(true);
            setEmail(e.target.value);
          }}
          onBlur={(e) => validateEmail(e.target.value)}
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? emailErrorId : undefined}
        />
        {emailError && (
          <span
            id={emailErrorId}
            role="alert"
            className="text-sale mt-1 block text-[11px] font-normal"
          >
            {emailError}
          </span>
        )}
      </label>
      {mutation.isError && (
        <p role="alert" className="text-sale text-[12px] font-bold">
          {mutation.error.message}
        </p>
      )}
      {success && !mutation.isError && (
        <p role="status" className="text-success text-[12px] font-bold">
          تغییرات با موفقیت ذخیره شد.
        </p>
      )}
      <button
        type="submit"
        disabled={mutation.isPending}
        aria-busy={mutation.isPending}
        className="bg-brand-500 hover:bg-brand-600 mt-1 rounded-xl py-3.5 text-[14px] font-extrabold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      >
        {mutation.isPending ? 'در حال ذخیره…' : 'ذخیره تغییرات'}
      </button>
    </form>
  );
}
