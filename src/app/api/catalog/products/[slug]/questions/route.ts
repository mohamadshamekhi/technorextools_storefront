import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import {
  createQuestionResultSchema,
  createQuestionSchema,
} from '@/features/catalog/services/pdp.schemas';
import { ApiError, apiClient } from '@/lib/api-client';
import { getSession } from '@/lib/session';

/** BFF for `POST /storefront/catalog/products/{slug}/questions` — auth required, moderated. */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(await getSession())) {
    return NextResponse.json({ error: 'برای ثبت پرسش وارد حساب شوید' }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = createQuestionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const result = await apiClient.post(
      `/storefront/catalog/products/${encodeURIComponent(slug)}/questions`,
      createQuestionResultSchema,
      { body: parsed.data },
    );
    revalidateTag(`catalog:questions:${slug}`);
    revalidateTag(`catalog:product:${slug}`);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    if (status === 401) return NextResponse.json({ error: 'نشست منقضی شده است' }, { status: 401 });
    if (status === 429) {
      return NextResponse.json(
        { error: 'تعداد درخواست‌ها زیاد است. کمی بعد تلاش کنید.' },
        { status: 429 },
      );
    }
    if (status === 400 || status === 404) {
      return NextResponse.json({ error: 'ثبت پرسش برای این محصول ممکن نیست' }, { status: 400 });
    }
    return NextResponse.json({ error: 'ثبت پرسش ناموفق بود. دوباره تلاش کنید.' }, { status: 502 });
  }
}
