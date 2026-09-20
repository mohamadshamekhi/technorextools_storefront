'use client';

import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { toPersianDigits } from '@/lib/persian';
import type { SessionUser } from '@/lib/session';

import { useUnreadNotificationsCount } from '../hooks/use-notifications';

const initial = (name?: string) => name?.trim().charAt(0) || 'ک';

/** Slim account-area header — logo, notifications shortcut, identity. */
export function AccountTopbar({ user }: { user: SessionUser }) {
  const unreadCount = useUnreadNotificationsCount();

  return (
    <header className="border-hairline bg-surface/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="flex items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href={routes.home} className="flex items-center gap-2.5">
          <span className="bg-brand-500 font-display grid size-9 place-items-center rounded-xl text-lg font-bold text-white">
            P
          </span>
          <span className="text-[17px] font-black tracking-tight">تکنورکس</span>
        </Link>

        <div className="flex items-center gap-3.5">
          <Link
            href={routes.dashboard.notifications}
            aria-label="نوتیفیکیشن‌ها"
            className="border-hairline bg-surface relative grid size-9 place-items-center rounded-xl"
          >
            <Icon name="bell" className="text-foreground-muted size-4" />
            {unreadCount ? (
              <span className="bg-brand-500 absolute -end-1 -top-1 grid size-4 place-items-center rounded-full text-[9.5px] font-bold text-white">
                {toPersianDigits(unreadCount)}
              </span>
            ) : null}
          </Link>
          <div className="flex items-center gap-2">
            <span className="bg-brand-500 grid size-8 place-items-center rounded-full text-[13px] font-bold text-white">
              {initial(user.name)}
            </span>
            <span className="hidden text-[13px] font-bold sm:inline">{user.name ?? 'کاربر'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
