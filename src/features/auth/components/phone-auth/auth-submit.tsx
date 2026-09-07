'use client';

import type { ReactNode } from 'react';

import { Icon } from '@/components/atoms';

type AuthSubmitProps = {
  children: ReactNode;
  onClick: () => void;
  busy?: boolean;
  withArrow?: boolean;
};

/** Full-width primary action button for a sign-in step. */
export function AuthSubmit({ children, onClick, busy, withArrow }: AuthSubmitProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="bg-brand-500 hover:bg-brand-600 mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-[15px] font-extrabold text-white shadow-lg transition-[background-color,transform] hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
    >
      {busy ? 'لطفاً صبر کنید…' : children}
      {withArrow && !busy ? <Icon name="arrowStart" className="size-4" /> : null}
    </button>
  );
}
