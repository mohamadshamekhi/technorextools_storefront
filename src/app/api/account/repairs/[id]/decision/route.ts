import { NextResponse } from 'next/server';

import { repairDecisionSchema } from '@/features/repairs';
import { repairsApi } from '@/features/account/services/repairs.api';
import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

type RouteParams = { params: Promise<{ id: string }> };

/** BFF: forwards the customer's approve/reject decision on a repair cost estimate.
 * `abzar/api` is owner-scoped (`404` when the request isn't theirs) and validates the state
 * transition (`409`), so its Persian `message` is passed straight through. */
export async function POST(request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  const payload: unknown = await request.json().catch(() => null);
  const parsed = repairDecisionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { message: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { id } = await params;
  try {
    const repair = await repairsApi.decision(id, parsed.data);
    return NextResponse.json(repair);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return NextResponse.json({ message: 'درخواست تعمیر یافت نشد' }, { status: 404 });
    }
    if (error instanceof ApiError && error.status === 409) {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }
    console.error('[repairs] decision failed', error);
    return NextResponse.json(
      { message: 'ثبت پاسخ ناموفق بود. دوباره تلاش کنید.' },
      { status: 502 },
    );
  }
}
