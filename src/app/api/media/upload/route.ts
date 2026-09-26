import { NextResponse } from 'next/server';

import { ACCEPTED_UPLOAD_TYPES, MAX_UPLOAD_BYTES, mediaViewSchema } from '@/features/media/types';
import { ApiError, apiClient } from '@/lib/api-client';
import { getSession } from '@/lib/session';

const ACCEPTED: readonly string[] = ACCEPTED_UPLOAD_TYPES;

/** BFF for `POST /storefront/media/upload` — one file per request, session required. */
export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'برای بارگذاری فایل وارد حساب شوید' }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'فایلی انتخاب نشده است' }, { status: 400 });
  }
  if (!ACCEPTED.includes(file.type)) {
    return NextResponse.json(
      { error: 'فقط تصویر (JPEG، PNG، WebP) یا PDF مجاز است' },
      { status: 400 },
    );
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: 'حجم فایل بیشتر از ۱۰ مگابایت است' }, { status: 400 });
  }

  const upstream = new FormData();
  upstream.append('file', file, file.name);
  const alt = form?.get('alt');
  if (typeof alt === 'string' && alt.trim()) upstream.append('alt', alt.trim().slice(0, 200));

  try {
    const media = await apiClient.postForm('/storefront/media/upload', mediaViewSchema, upstream);
    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    if (status === 401) return NextResponse.json({ error: 'نشست منقضی شده است' }, { status: 401 });
    if (status === 400 || status === 413) {
      return NextResponse.json({ error: 'فایل پذیرفته نشد' }, { status: 400 });
    }
    return NextResponse.json({ error: 'بارگذاری ناموفق بود. دوباره تلاش کنید.' }, { status: 502 });
  }
}
