import { NextResponse } from 'next/server';

import { checkoutApi } from '@/features/checkout/services/checkout.api';
import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';

/** BFF: is a checkout still running, or is an unpaid order holding this customer's cart? */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  try {
    const result = await checkoutApi.inFlight();
    const response = NextResponse.json(result);
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : 'بررسی وضعیت سفارش ناموفق بود';
    return NextResponse.json({ message }, { status });
  }
}
