import type { ReactNode } from 'react';

import type { SessionUser } from '@/lib/session';

import { AccountMobileNav } from './account-mobile-nav';
import { AccountSidebar } from './account-sidebar';
import { AccountTopbar } from './account-topbar';

type AccountShellProps = {
  user: SessionUser;
  children: ReactNode;
};

/** Customer account-area chrome: topbar + responsive nav + content well. */
export function AccountShell({ user, children }: AccountShellProps) {
  return (
    <div className="bg-surface-muted min-h-dvh">
      <AccountTopbar user={user} />
      <div className="mx-auto flex max-w-[1360px]">
        <AccountSidebar user={user} />
        <main className="min-w-0 flex-1 px-5 pb-20 pt-4 sm:px-8">
          <AccountMobileNav />
          <div className="pt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
