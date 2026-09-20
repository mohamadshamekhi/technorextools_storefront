import { NextResponse } from 'next/server';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { checkoutApi } from '@/features/checkout/services/checkout.api';

/** BFF: re-opens a payment session for a pending `online` order (retry after failure). */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> },
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  const { orderNumber } = await params;

  try {
    const result = await checkoutApi.payAgain(orderNumber);
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : 'باز کردن درگاه پرداخت ناموفق بود';
    return NextResponse.json({ message }, { status });
  }
}
