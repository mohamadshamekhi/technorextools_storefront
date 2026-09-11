import { NextResponse } from 'next/server';
import { z } from 'zod';

import { ApiError } from '@/lib/api-client';
import { getSession } from '@/lib/session';
import { authApi } from '@/features/auth/services/auth.api';

export const dynamic = 'force-dynamic';

const patchBodySchema = z
  .object({
    fullName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(160).nullable(),
  })
  .partial()
  .refine((v) => Object.keys(v).length > 0, 'حداقل یک فیلد باید ارسال شود');

/**
 * BFF endpoint: resolves the current user for client components.
 * Returns 401 (not an error body) when there is no valid session.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  try {
    const user = await authApi.me();
    return NextResponse.json(user);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json({ message: 'Failed to resolve user' }, { status });
  }
}

/** BFF: self-service profile edit (name / email). */
export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = patchBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'ورودی نامعتبر است', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const user = await authApi.updateProfile(parsed.data);
    return NextResponse.json(user);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : 'ثبت اطلاعات ناموفق بود';
    return NextResponse.json({ message }, { status });
  }
}
