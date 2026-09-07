import { NextResponse } from 'next/server';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { authApi } from '@/features/auth/services/auth.api';

export const dynamic = 'force-dynamic';

/**
 * BFF endpoint: resolves the current user for client components.
 * Returns 401 (not an error body) when there is no valid session.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  try {
    const user = await authApi.me();
    return NextResponse.json(user);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to resolve user' }, { status });
  }
}
