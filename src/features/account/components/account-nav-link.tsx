'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { useUnreadNotificationsCount } from '@/features/account/hooks/use-notifications';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import type { AccountNavItem } from '../types';

/** One sidebar entry; highlights when the current route matches. */
export function AccountNavLink({ item }: { item: AccountNavItem }) {
  const pathname = usePathname();
  const unreadCount = useUnreadNotificationsCount();
  const badge =
    item.href === routes.dashboard.notifications ? unreadCount || undefined : item.badge;
  const active =
    item.href === routes.dashboard.root ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13.5px] font-bold transition-colors',
        active
          ? 'bg-brand-50 text-brand-700 ring-brand-100 ring-1'
          : 'text-foreground-muted hover:bg-surface-sunken hover:text-foreground',
      )}
    >
      {active ? (
        <span aria-hidden className="bg-brand-500 absolute inset-y-2 end-0 w-1 rounded-full" />
      ) : null}
      <Icon name={item.icon} className={cn('size-[18px]', active && 'text-brand-600')} />
      {item.label}
      {badge ? (
        <span className="bg-brand-500 me-auto rounded-full px-2 py-0.5 text-[10.5px] font-bold text-white">
          {toPersianDigits(badge)}
        </span>
      ) : null}
    </Link>
  );
}
