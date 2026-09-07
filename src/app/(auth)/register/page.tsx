import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'ثبت‌نام',
  path: routes.auth.register,
  noindex: true,
});

/**
 * Registration is folded into the unified phone / OTP flow on `/login` —
 * a new number is routed to the profile step automatically.
 */
export default function RegisterPage(): never {
  permanentRedirect(routes.auth.login);
}
