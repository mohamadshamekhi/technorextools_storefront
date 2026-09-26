import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

/**
 * Same-origin proxy for GLB models. The media bucket serves no `Access-Control-Allow-Origin`
 * header, so `GLTFLoader`'s fetch is blocked cross-origin; streaming the file through the BFF
 * makes it same-origin. Host allowlist keeps this from being an open proxy.
 */
const ALLOWED_HOST_SUFFIXES = ['.arvanstorage.ir', '.abzar.example'];

const querySchema = z.object({ src: z.string().url().max(2048) }).refine(({ src }) => {
  const { protocol, hostname } = new URL(src);
  return protocol === 'https:' && ALLOWED_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
}, 'host not allowed');

export async function GET(request: NextRequest) {
  const query = querySchema.safeParse({ src: request.nextUrl.searchParams.get('src') ?? '' });
  if (!query.success) {
    return NextResponse.json({ error: 'درخواست نامعتبر است' }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(query.data.src, { cache: 'no-store' });
  } catch {
    return NextResponse.json({ error: 'دریافت مدل ناموفق بود.' }, { status: 502 });
  }
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: 'مدل یافت نشد.' },
      { status: upstream.status === 404 ? 404 : 502 },
    );
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'model/gltf-binary',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
