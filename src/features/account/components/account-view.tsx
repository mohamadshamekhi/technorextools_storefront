import type { SessionUser } from '@/lib/session';

import { AccountForm } from './account-form';
import { PageHeading } from './page-heading';

export function AccountView({ user }: { user: SessionUser }) {
  return (
    <div>
      <PageHeading title="اطلاعات حساب کاربری" subtitle="نام، ایمیل و اطلاعات تماس خود را به‌روز کنید" />
      <AccountForm user={user} />
    </div>
  );
}
