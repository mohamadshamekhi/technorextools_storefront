import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { isAdmin } from '@/lib/rbac';
import { buildMetadata } from '@/lib/seo';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({ title: 'مدیریت کاربران', noindex: true });

/** Admin-only. Middleware already guards this; re-check server-side too. */
export default async function AdminUsersPage() {
  const user = await getSession();
  if (!isAdmin(user?.role)) redirect(routes.dashboard.root);

  return (
    <div>
      <h1 className="text-xl font-black tracking-tight sm:text-[1.35rem]">مدیریت کاربران</h1>
      <div className="border-hairline bg-surface rounded-card mt-6 grid place-items-center gap-3 border px-6 py-16 text-center shadow-(--shadow-soft)">
        <span className="bg-brand-50 text-brand-600 ring-brand-100 grid size-14 place-items-center rounded-2xl ring-1">
          <Icon name="user" className="size-7" />
        </span>
        <p className="text-[15px] font-bold">به‌زودی</p>
        <p className="text-foreground-muted max-w-sm text-[13px] leading-loose">
          فهرست کاربران، نقش‌ها و دسترسی‌ها در این بخش مدیریت می‌شود.
        </p>
      </div>
    </div>
  );
}
