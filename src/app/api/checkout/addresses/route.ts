import { NextResponse } from 'next/server';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { checkoutAddressApi } from '@/features/checkout/services/checkout-address.api';
import { createAddressInputSchema } from '@/features/checkout/services/checkout-address.schemas';

export const dynamic = 'force-dynamic';

/** BFF: lists the signed-in customer's saved addresses. */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  try {
    const addresses = await checkoutAddressApi.list();
    return NextResponse.json(addresses);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to load addresses' }, { status });
  }
}

/** BFF: creates a new address for the signed-in customer. */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });

  const body: unknown = await request.json().catch(() => null);
  const parsed = createAddressInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const address = await checkoutAddressApi.create(parsed.data);
    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to create address' }, { status });
  }
}
