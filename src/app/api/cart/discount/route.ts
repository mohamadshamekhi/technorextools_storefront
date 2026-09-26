import { NextResponse } from 'next/server';
import { z } from 'zod';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { cartApi, syncCartToServer } from '@/features/cart/services/cart.api';
import { cartSyncLineSchema } from '@/features/cart/services/cart.schemas';

const bodySchema = z.object({
  code: z.string().trim().min(1).max(60),
  lines: z.array(cartSyncLineSchema).max(50),
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
  } catch (error) {
    // A sync failure is about the cart, not the code — don't let `abzar/api`'s «محصول مورد نظر
    // یافت نشد» surface under the coupon field, where it reads as "this code is invalid".
    console.error('[cart] discount sync failed', error);
    const status = error instanceof ApiError ? error.status : 502;
    const details = error instanceof ApiError ? error.details : undefined;
    // `abzar/api` tags cart-line failures with a stable `details.code` and a Persian `message`
    // meant for the customer — pass those through untouched; only fall back when it doesn't.
    const code = (details as { code?: string } | undefined)?.code;
    if (code && error instanceof ApiError) {
      return NextResponse.json({ message: error.message, details }, { status });
    }
    return NextResponse.json(
      {
        message:
          status === 404
            ? 'یکی از کالاهای سبد روی سرور در دسترس نیست. آن را حذف و دوباره اضافه کنید.'
            : 'هماهنگی سبد با سرور ناموفق بود. دوباره تلاش کنید.',
      },
      { status: status === 404 ? 409 : status },
    );
  }

  try {
    const result = await cartApi.validateDiscount(parsed.data.code);
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : 'اعمال کد تخفیف ناموفق بود';
    return NextResponse.json({ message }, { status });
  }
}
