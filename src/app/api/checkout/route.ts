import { NextResponse } from 'next/server';
import { z } from 'zod';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { cartSyncLinesSchema } from '@/features/cart/services/cart.schemas';
import { syncCartToServer } from '@/features/cart/services/cart.api';
import { checkoutApi } from '@/features/checkout/services/checkout.api';
import { startCheckoutInputSchema } from '@/features/checkout/services/checkout.schemas';

const bodySchema = z.object({
  input: startCheckoutInputSchema,
  lines: cartSyncLinesSchema,
});

/**
 * BFF: places the order. `abzar/api`'s `/storefront/checkout` reads its own server-side
 * cart, so this first syncs the client's local (`zustand`) cart lines into it — same
 * approach as `/api/cart/discount` — then calls the real checkout-start.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    await syncCartToServer(parsed.data.lines);
    const result = await checkoutApi.start(parsed.data.input);
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : 'ثبت سفارش ناموفق بود';
    const details = error instanceof ApiError ? error.details : undefined;
    return NextResponse.json({ message, details }, { status });
  }
}
