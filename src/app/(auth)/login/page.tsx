import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { AuthSplit, PhoneAuthFlow } from '@/features/auth';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'ورود یا ثبت‌نام',
  description: 'ورود و ثبت‌نام در پوما ایر با شماره موبایل و کد تأیید یک‌بارمصرف.',
  path: routes.auth.login,
  noindex: true,
});

export default function LoginPage() {
  return (
    <AuthSplit>
      <PhoneAuthFlow />
    </AuthSplit>
  );
}
