import { NextResponse } from 'next/server';
import { z } from 'zod';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { cartApi, syncCartToServer } from '@/features/cart/services/cart.api';

const bodySchema = z.object({
  code: z.string().trim().min(1).max(60),
  lines: z
    .array(z.object({ variantId: z.string().length(24), qty: z.number().int().min(1).max(999) }))
    .max(50),
});

/**
 * BFF: validates a discount code against the signed-in customer's cart.
 *
 * `abzar/api`'s `/storefront/discounts/validate` evaluates its own server-side cart —
 * the storefront's cart is still local (`zustand`), so this first replaces the real cart
 * with exactly the lines the client has (clear, then re-add each), then validates. A
 * line whose id isn't a real variant id (a product with no variant row — shouldn't
 * happen for a sellable product) is rejected by the add-item call with a normal 404,
 * surfaced as-is below.
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
    const result = await cartApi.validateDiscount(parsed.data.code);
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : 'اعمال کد تخفیف ناموفق بود';
    return NextResponse.json({ message }, { status });
  }
}
