import { NextResponse, type NextRequest } from 'next/server';

import { ADMIN_PREFIX, AUTH_PATHS, DASHBOARD_PREFIX, routes } from '@/config/routes';
import { DEV_SESSION_USER, decodeToken, isDevAuthBypass } from '@/lib/jwt';
import { isAdmin } from '@/lib/rbac';

const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME ?? 'abzar_session';

/** Edge RBAC gate. Cryptographic token verification happens on `abzar/api`. */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const realUser = token ? decodeToken(token) : null;
  const bypass = isDevAuthBypass();
  const user = realUser ?? (bypass ? DEV_SESSION_USER : null);

  const isAuthRoute = AUTH_PATHS.some((p) => pathname === p);
  const isDashboard = pathname.startsWith(DASHBOARD_PREFIX);
  const isAdminRoute = pathname.startsWith(ADMIN_PREFIX);

  if (isDashboard && !user) {
    const url = req.nextUrl.clone();
    url.pathname = routes.auth.login;
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && !isAdmin(user?.role)) {
    return NextResponse.redirect(new URL(routes.dashboard.root, req.url));
  }

  if (isAuthRoute && realUser) {
    return NextResponse.redirect(new URL(routes.dashboard.root, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/forgot-password'],
};
