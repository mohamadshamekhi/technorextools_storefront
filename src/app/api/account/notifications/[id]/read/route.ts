import { NextResponse } from 'next/server';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { notificationsApi } from '@/features/account/services/notifications.api';

export const dynamic = 'force-dynamic';

type RouteParams = { params: Promise<{ id: string }> };

/** BFF: marks one notification as read. */
export async function PATCH(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  const { id } = await params;
  try {
    await notificationsApi.markRead(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to mark notification as read' }, { status });
  }
}
