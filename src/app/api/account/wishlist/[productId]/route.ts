import { NextResponse } from 'next/server';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { wishlistApi } from '@/features/account/services/wishlist.api';

export const dynamic = 'force-dynamic';

type RouteParams = { params: Promise<{ productId: string }> };

/** BFF: removes a product from the signed-in customer's wishlist. */
export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  const { productId } = await params;
  try {
    await wishlistApi.remove(productId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to remove from wishlist' }, { status });
  }
}
