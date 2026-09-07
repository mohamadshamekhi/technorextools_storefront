import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Heading, Text } from '@/components/atoms';
import { routes } from '@/config/routes';
import { isAdmin } from '@/lib/rbac';
import { buildMetadata } from '@/lib/seo';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({ title: 'User management', noindex: true });

/** Admin-only. Middleware already guards this; re-check server-side too. */
export default async function AdminUsersPage() {
  const user = await getSession();
  if (!isAdmin(user?.role)) redirect(routes.dashboard.root);

  return (
    <div className="flex flex-col gap-6">
      <Heading as="h1" className="text-2xl">
        User management
      </Heading>
      <Text>Feature slice: src/features/user-management</Text>
    </div>
  );
}
