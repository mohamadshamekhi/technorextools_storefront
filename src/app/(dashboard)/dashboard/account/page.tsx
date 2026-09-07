import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { AccountView } from '@/features/account';
import { buildMetadata } from '@/lib/seo';
import { getSession } from '@/lib/session';

export const metadata: Metadata = buildMetadata({
  title: 'اطلاعات حساب',
  path: routes.dashboard.profile,
  noindex: true,
});

export default async function AccountPage() {
  const user = await getSession();
  if (!user) redirect(routes.auth.login);

  return <AccountView user={user} />;
}
