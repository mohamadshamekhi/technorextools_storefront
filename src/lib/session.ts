import 'server-only';

import { cookies } from 'next/headers';

import { env } from '@/config/env';
import { DEV_SESSION_USER, decodeToken, isDevAuthBypass, type SessionUser } from '@/lib/jwt';

export type { SessionUser } from '@/lib/jwt';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

/** Current user from the HttpOnly session cookie, or null. */
export async function getSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(env.SESSION_COOKIE_NAME)?.value;
  const user = token ? decodeToken(token) : null;
  if (!user && isDevAuthBypass()) return DEV_SESSION_USER;
  return user;
}

export async function setSessionCookie(token: string, maxAgeSeconds: number): Promise<void> {
  (await cookies()).set(env.SESSION_COOKIE_NAME, token, {
    ...COOKIE_OPTIONS,
    maxAge: maxAgeSeconds,
  });
}

export async function clearSessionCookie(): Promise<void> {
  (await cookies()).delete(env.SESSION_COOKIE_NAME);
}
