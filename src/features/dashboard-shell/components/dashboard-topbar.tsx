import { Badge } from '@/components/atoms';
import { siteConfig } from '@/config/site';
import { toPersianDigits } from '@/lib/persian';
import type { SessionUser } from '@/lib/session';
import { formatRole } from '@/features/auth';
import { LogoutButton } from '@/features/auth';

import { SidebarToggle } from './sidebar-toggle';

/** Server Component top bar; interactive bits are isolated leaf clients. */
export function DashboardTopbar({ user }: { user: SessionUser }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-black/10 px-4 dark:border-white/10">
      <div className="flex items-center gap-3">
        <SidebarToggle />
        <span className="font-bold tracking-tight">{siteConfig.name}</span>
        <Badge tone="brand">{formatRole(user.role)}</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span dir="ltr" className="text-foreground-muted hidden text-sm sm:inline">
          {toPersianDigits(user.mobile)}
        </span>
        <LogoutButton />
      </div>
    </header>
  );
}
