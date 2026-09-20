import { NextResponse } from 'next/server';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { wishlistApi } from '@/features/account/services/wishlist.api';
import { addToWishlistInputSchema } from '@/features/account/services/wishlist.schemas';

export const dynamic = 'force-dynamic';

/** BFF: lists the signed-in customer's wishlist. */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  try {
    const items = await wishlistApi.list();
    return NextResponse.json(items);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to load wishlist' }, { status });
  }
}

/** BFF: adds a product to the signed-in customer's wishlist. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  const parsed = addToWishlistInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const result = await wishlistApi.add(parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to add to wishlist' }, { status });
  }
}
