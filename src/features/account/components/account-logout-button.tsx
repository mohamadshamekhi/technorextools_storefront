'use client';

import { useTransition } from 'react';

import { Icon } from '@/components/atoms';
import { logoutAction } from '@/features/auth/services/auth.actions';

/** Persian, brand-styled sign-out control for the account sidebar. */
export function AccountLogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => void logoutAction())}
      className="text-sale hover:bg-sale/8 flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13.5px] font-bold transition-colors disabled:opacity-60"
    >
      <Icon name="logout" className="size-[18px]" />
      {pending ? 'در حال خروج…' : 'خروج از حساب'}
    </button>
  );
}
