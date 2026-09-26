import { NextResponse } from 'next/server';

import { trackedOrderSchema } from '@/features/order-tracking/services/order-tracking.schemas';
import { trackingFormSchema } from '@/features/order-tracking/types';
import { ApiError, apiClient } from '@/lib/api-client';

const NOT_FOUND = 'سفارشی با این مشخصات پیدا نشد. کد سفارش و شماره موبایل را بررسی کنید.';

/**
 * BFF for `POST /storefront/orders/track` — guest lookup, no session. `abzar/api` answers 404
 * for a wrong mobile as well as a wrong code, deliberately; we keep that single message.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = trackingFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const order = await apiClient.post('/storefront/orders/track', trackedOrderSchema, {
      auth: false,
      body: parsed.data,
    });
    return NextResponse.json(order, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    if (status === 404 || status === 400) {
      return NextResponse.json({ error: NOT_FOUND }, { status: 404 });
    }
    if (status === 429) {
      return NextResponse.json(
        { error: 'تعداد درخواست‌ها زیاد است. یک دقیقه بعد دوباره تلاش کنید.' },
        { status: 429 },
      );
    }
    return NextResponse.json(
      { error: 'پیگیری سفارش ناموفق بود. دوباره تلاش کنید.' },
      { status: 502 },
    );
  }
}
