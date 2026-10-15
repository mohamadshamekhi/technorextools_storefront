'use client';

import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { toPersianDigits } from '@/lib/persian';
import type { SessionUser } from '@/lib/session';

import { useUnreadNotificationsCount } from '../hooks/use-notifications';

const initial = (name?: string) => name?.trim().charAt(0) || 'ک';

/** Account-area header — logo, back-to-store, notifications, identity chip. */
export function AccountTopbar({ user }: { user: SessionUser }) {
  const unreadCount = useUnreadNotificationsCount();

  return (
    <header className="border-hairline bg-surface/80 sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link href={routes.home} className="flex items-center gap-2.5">
            <span className="font-display grid size-9 shrink-0 place-items-center rounded-xl bg-(image:--gradient-brand) text-lg font-bold text-white shadow-(--shadow-brand)">
              P
            </span>
            <span className="text-[17px] font-black tracking-tight">تکنورکس</span>
          </Link>
          <span className="bg-hairline hidden h-6 w-px sm:block" />
          <span className="text-foreground-muted hidden text-[12.5px] font-bold sm:block">
            حساب کاربری
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={routes.home}
            className="border-hairline text-foreground-muted hover:border-brand-500/40 hover:text-brand-600 hidden h-10 items-center gap-1.5 rounded-xl border px-3.5 text-[12.5px] font-bold transition-colors sm:inline-flex"
          >
            <Icon name="arrowStart" className="size-4 rotate-180" />
            بازگشت به فروشگاه
          </Link>

          <Link
            href={routes.dashboard.notifications}
            aria-label={
              unreadCount
                ? `نوتیفیکیشن‌ها، ${toPersianDigits(unreadCount)} خوانده‌نشده`
                : 'نوتیفیکیشن‌ها'
            }
            className="border-hairline bg-surface hover:border-brand-500/40 hover:text-brand-600 text-foreground-muted relative grid size-10 place-items-center rounded-xl border transition-colors"
          >
            <Icon name="bell" className="size-[1.05rem]" />
            {unreadCount ? (
              <span className="bg-sale ring-surface absolute -end-1 -top-1 grid min-w-4.5 place-items-center rounded-full px-1 text-[10px] leading-[1.05rem] font-bold text-white ring-2">
                {unreadCount > 9 ? '+۹' : toPersianDigits(unreadCount)}
              </span>
            ) : null}
          </Link>

          <div className="border-hairline bg-surface-muted/70 flex h-10 items-center gap-2 rounded-xl border ps-3 pe-1">
            <span className="hidden max-w-32 truncate text-[12.5px] font-bold sm:inline">
              {user.name ?? 'کاربر'}
            </span>
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-(image:--gradient-brand) text-[13px] font-bold text-white">
              {initial(user.name)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
