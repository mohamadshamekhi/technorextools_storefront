import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { AuthSplit, PhoneAuthFlow } from '@/features/auth';
import { buildMetadata } from '@/lib/seo';
import type { PageProps } from '@/types';

export const metadata: Metadata = buildMetadata({
  title: 'ورود یا ثبت‌نام',
  description: 'ورود و ثبت‌نام در تکنورکس با شماره موبایل و کد تأیید یک‌بارمصرف.',
  path: routes.auth.login,
  noindex: true,
});

type LoginSearch = { next?: string | string[] };

/**
 * Only an internal, single-leading-slash path is a safe post-login redirect target.
 * Param name (`next`) matches the one `middleware.ts` already sets when it bounces an
 * unauthenticated visitor away from `/dashboard/*`.
 */
function resolveRedirect(raw: string | string[] | undefined): string | undefined {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || !value.startsWith('/') || value.startsWith('//')) return undefined;
  return value;
}

export default async function LoginPage({
  searchParams,
}: PageProps<Record<string, never>, LoginSearch>) {
  const redirectTo = resolveRedirect((await searchParams).next);

  return (
    <AuthSplit>
      <PhoneAuthFlow redirectTo={redirectTo} />
    </AuthSplit>
  );
}
