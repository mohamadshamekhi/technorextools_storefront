import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { AccountShell } from '@/features/account';
import { getSession } from '@/lib/session';
import type { WithChildren } from '@/types';

/** Protected customer account shell. Server-side session gate — defense in depth with middleware. */
export default async function DashboardLayout({ children }: WithChildren) {
  const user = await getSession();
  if (!user) redirect(routes.auth.login);

  return <AccountShell user={user}>{children}</AccountShell>;
}
