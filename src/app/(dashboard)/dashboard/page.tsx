import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { OverviewView } from '@/features/account';
import { buildMetadata } from '@/lib/seo';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({ title: 'خلاصهٔ داشبورد', noindex: true });

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect(routes.auth.login);

  return <OverviewView user={user} />;
}
