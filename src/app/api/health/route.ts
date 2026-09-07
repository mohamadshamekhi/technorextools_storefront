import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/** Liveness probe for load balancers / uptime monitors. */
export function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'abzar-storefront',
    timestamp: new Date().toISOString(),
  });
}
