import { toPersianDigits } from '@/lib/persian';
import type { SessionUser } from '@/lib/session';

import { ACCOUNT_NAV } from '../data/nav';
import { AccountLogoutButton } from './account-logout-button';
import { AccountNavLink } from './account-nav-link';

const initial = (name?: string) => name?.trim().charAt(0) || 'کاربر';

/** Desktop account navigation rail (RSC; only the links are client leaves). */
export function AccountSidebar({ user }: { user: SessionUser }) {
  return (
    <aside className="border-hairline hidden w-64 shrink-0 border-e p-5 lg:block">
      <div className="bg-brand-50 ring-brand-100 mb-6 flex items-center gap-3 rounded-2xl p-3.5 ring-1">
        <span className="bg-brand-500 bg-(image:--gradient-brand) shadow-(--shadow-brand) grid size-11 shrink-0 place-items-center rounded-full text-base font-bold text-white">
          {initial(user.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-bold">{user.name ?? 'کاربر تکنورکس'}</p>
          <p dir="ltr" className="text-foreground-muted truncate text-end text-[11.5px]">
            {toPersianDigits(user.mobile)}
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {ACCOUNT_NAV.map((item) => (
          <AccountNavLink key={item.href} item={item} />
        ))}
        <div className="bg-hairline my-3 h-px" />
        <AccountLogoutButton />
      </nav>
    </aside>
  );
}
