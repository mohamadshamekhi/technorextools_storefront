'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routes } from '@/config/routes';
import type { UserRole } from '@/constants';
import { isAdmin } from '@/lib/rbac';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/ui-store';

const LINKS = [
  { label: 'Overview', href: routes.dashboard.root },
  { label: 'Analytics', href: routes.dashboard.analytics },
  { label: 'Billing', href: routes.dashboard.billing },
  { label: 'Settings', href: routes.dashboard.settings },
];

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const open = useUiStore((s) => s.sidebarOpen);

  const links = isAdmin(role)
    ? [...LINKS, { label: 'Admin · Users', href: routes.admin.users }]
    : LINKS;

  return (
    <aside
      data-open={open}
      className="hidden w-60 shrink-0 border-r border-black/10 p-4 md:block data-[open=false]:md:hidden dark:border-white/10"
    >
      <nav className="flex flex-col gap-1" aria-label="Dashboard">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-brand-50 text-brand-700 font-medium'
                  : 'text-foreground-muted hover:bg-surface-muted hover:text-foreground',
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
