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
      <div className="mx-auto flex w-full max-w-[1440px] items-start gap-6 px-4 sm:px-6 lg:px-8">
        <AccountSidebar user={user} />
        <main className="min-w-0 flex-1 pb-20">
          <AccountMobileNav />
          <div className="pt-5">{children}</div>
        </main>
      </div>
    </div>
  );
}
