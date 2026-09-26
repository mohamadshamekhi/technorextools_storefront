import { NextResponse } from 'next/server';
import { z } from 'zod';

import { MAX_REPAIR_ATTACHMENTS, repairRequestSchema } from '@/features/repairs/types';
import { ApiError, apiClient } from '@/lib/api-client';
import { getSession } from '@/lib/session';

/** BFF for `POST /storefront/repairs` — authenticated, owner-scoped in `abzar/api`. */
const payloadSchema = z.object({
  issueDescription: z.string().trim().min(10).max(2000),
  warrantySerial: z.string().trim().min(1).max(120).optional(),
  mediaIds: z.array(z.string().min(1)).max(MAX_REPAIR_ATTACHMENTS).optional(),
});

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'برای ثبت درخواست وارد حساب شوید' }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const repair = await apiClient.post('/storefront/repairs', repairRequestSchema, {
      body: parsed.data,
    });
    return NextResponse.json(repair, { status: 201 });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    if (status === 401) return NextResponse.json({ error: 'نشست منقضی شده است' }, { status: 401 });
    if (status === 400 || status === 404) {
      return NextResponse.json(
        { error: 'سریال گارانتی معتبر نیست یا به حساب شما تعلق ندارد' },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: 'ثبت درخواست ناموفق بود. دوباره تلاش کنید.' },
      { status: 502 },
    );
  }
}
