'use client';

import { toPersianDigits } from '@/lib/persian';
import type { SessionUser } from '@/lib/session';

const field =
  'border-hairline focus:border-brand-500 focus:ring-brand-500/15 w-full rounded-xl border px-3.5 py-3 text-[14px] outline-none transition-shadow focus:ring-2';

/** Visual profile form. Submission is wired once `abzar/api` exposes the endpoint. */
export function AccountForm({ user }: { user: SessionUser }) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="border-hairline bg-surface flex max-w-xl flex-col gap-4 rounded-2xl border p-6 shadow-sm"
    >
      <label className="text-[12px] font-bold">
        <span className="text-foreground-muted mb-1.5 block">نام و نام خانوادگی</span>
        <input className={field} defaultValue={user.name ?? ''} />
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
        <input className={field} dir="ltr" placeholder="example@mail.com" />
      </label>
      <button
        type="submit"
        className="bg-brand-500 hover:bg-brand-600 mt-1 rounded-xl py-3.5 text-[14px] font-extrabold text-white transition-colors"
      >
        ذخیره تغییرات
      </button>
    </form>
  );
}
