import { toPersianDigits } from '@/lib/persian';
import type { SessionUser } from '@/lib/session';

import { ACCOUNT_NAV } from '../data/nav';
import { AccountLogoutButton } from './account-logout-button';
import { AccountNavLink } from './account-nav-link';

const initial = (name?: string) => name?.trim().charAt(0) || 'ک';

/** Desktop account navigation rail (RSC; only the links are client leaves). */
export function AccountSidebar({ user }: { user: SessionUser }) {
  return (
    <aside className="border-hairline bg-surface sticky top-[72px] my-5 hidden w-[16.5rem] shrink-0 rounded-2xl border p-4 shadow-(--shadow-soft) lg:block">
      <div className="mb-5 flex items-center gap-3 rounded-xl bg-(image:--gradient-brand) p-3.5 text-white shadow-(--shadow-brand)">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/20 text-base font-bold">
          {initial(user.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-bold">{user.name ?? 'کاربر تکنورکس'}</p>
          <p dir="ltr" className="truncate text-end text-[11.5px] text-white/75">
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
