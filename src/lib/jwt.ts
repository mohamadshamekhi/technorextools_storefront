import { z } from 'zod';

import { UserRole } from '@/constants';

/**
 * Edge-safe JWT payload decoding. Pure — no `next/headers`, no Node Buffer —
 * so it is importable from both middleware (Edge) and Server Components.
 *
 * This DECODES only; cryptographic verification is `abzar/api`'s job.
 */
const jwtPayloadSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  name: z.string().optional(),
  exp: z.number(),
});

export type SessionUser = {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
};

function base64UrlDecode(segment: string): string {
  const padded = segment.replace(/-/g, '+').replace(/_/g, '/');
  const withPad = padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), '=');
  if (typeof atob === 'function') return atob(withPad);
  return Buffer.from(withPad, 'base64').toString('binary');
}

export function decodeToken(token: string): SessionUser | null {
  const segment = token.split('.')[1];
  if (!segment) return null;
  try {
    const decoded = decodeURIComponent(
      base64UrlDecode(segment)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    );
    const parsed = jwtPayloadSchema.safeParse(JSON.parse(decoded));
    if (!parsed.success || parsed.data.exp * 1000 < Date.now()) return null;
    const { sub, email, role, name } = parsed.data;
    return { id: sub, email, role, name };
  } catch {
    return null;
  }
}
