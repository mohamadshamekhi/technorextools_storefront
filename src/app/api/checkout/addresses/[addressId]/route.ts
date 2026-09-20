import { NextResponse } from 'next/server';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { checkoutAddressApi } from '@/features/checkout/services/checkout-address.api';
import { updateAddressInputSchema } from '@/features/checkout/services/checkout-address.schemas';

export const dynamic = 'force-dynamic';

type RouteParams = { params: Promise<{ addressId: string }> };

/** BFF: updates one of the signed-in customer's saved addresses. */
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  const { addressId } = await params;
  const body: unknown = await request.json().catch(() => null);
  const parsed = updateAddressInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const address = await checkoutAddressApi.update(addressId, parsed.data);
    return NextResponse.json(address);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to update address' }, { status });
  }
}

/** BFF: deletes one of the signed-in customer's saved addresses. */
export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  const { addressId } = await params;
  try {
    await checkoutAddressApi.remove(addressId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to delete address' }, { status });
  }
}
