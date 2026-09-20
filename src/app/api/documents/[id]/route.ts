import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

import { pdpMock } from '@/features/catalog/data/pdp-mock';
import { signFileUrl } from '@/features/catalog/services/document-signing';

const paramsSchema = z.object({ id: z.string().min(1).max(64) });

/** Mints a fresh expiring signed file URL per request and redirects to it. */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const parsed = paramsSchema.safeParse(await params);
  if (!parsed.success) {
    return NextResponse.json({ fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const doc = pdpMock.documents.find((item) => item.id === parsed.data.id);
  if (!doc) return NextResponse.json({ message: 'فایل یافت نشد.' }, { status: 404 });

  const response = NextResponse.redirect(new URL(signFileUrl(doc.url), request.url));
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
