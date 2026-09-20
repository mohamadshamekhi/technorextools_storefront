import { NextResponse } from 'next/server';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { notificationsApi } from '@/features/account/services/notifications.api';

export const dynamic = 'force-dynamic';

/** BFF: lists the signed-in customer's notifications. */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  try {
    const items = await notificationsApi.list();
    return NextResponse.json(items);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to load notifications' }, { status });
  }
}

/** BFF: marks every notification as read. */
export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  try {
    await notificationsApi.markAllRead();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to mark notifications as read' }, { status });
  }
}
