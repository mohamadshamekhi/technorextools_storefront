'use server';

import { redirect } from 'next/navigation';

import { routes } from '@/config/routes';
import { clearSessionCookie } from '@/lib/session';
import { authApi } from '@/features/auth/services/auth.api';

/**
 * Sign the current user out. The phone / OTP sign-in flow lives on the client
 * (`features/auth/components/phone-auth`) against mock data until `abzar/api`
 * is wired; at that point it moves behind a Server Action or BFF route here.
 */
export async function logoutAction(): Promise<never> {
  try {
    // Best-effort: an already-expired/invalid token (e.g. the dev-bypass mock
    // session) makes `abzar/api` reject this with 401 — sign-out must still
    // proceed either way, so never let it block clearing the cookie.
    await authApi.logout();
  } catch {
    /* ignore — the cookie is cleared below regardless */
  } finally {
    await clearSessionCookie();
  }
  redirect(routes.auth.login);
}
