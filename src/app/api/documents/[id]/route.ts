import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

import { getProduct } from '@/features/catalog/services/catalog.api';
import { signFileUrl } from '@/features/catalog/services/document-signing';
import { ApiError } from '@/lib/api-client';

const paramsSchema = z.object({ id: z.string().min(1).max(64) });
const querySchema = z.object({ product: z.string().trim().min(1).max(200) });

/**
 * Resolves a document id against its product's `documents` from `abzar/api`, then redirects to a
 * freshly signed, short-lived file URL. Redirecting only to an API-served URL keeps this from
 * being an open redirect.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const parsed = paramsSchema.safeParse(await params);
  const query = querySchema.safeParse({
    product: request.nextUrl.searchParams.get('product') ?? '',
  });
  if (!parsed.success || !query.success) {
    return NextResponse.json({ error: 'درخواست نامعتبر است' }, { status: 400 });
  }

  let doc;
  try {
    const product = await getProduct(query.data.product);
    doc = product.documents.find((item) => item.id === parsed.data.id);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    if (status === 404) return NextResponse.json({ error: 'فایل یافت نشد.' }, { status: 404 });
    return NextResponse.json({ error: 'دریافت فایل ناموفق بود.' }, { status: 502 });
  }
  if (!doc) return NextResponse.json({ error: 'فایل یافت نشد.' }, { status: 404 });

  const response = NextResponse.redirect(new URL(signFileUrl(doc.url), request.url));
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
