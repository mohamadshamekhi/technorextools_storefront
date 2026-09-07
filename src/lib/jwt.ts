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

/**
 * Dev-only escape hatch. While `abzar/api` auth is not wired up locally, this
 * lets you browse the dashboard without a real API-issued session. Hard-gated to
 * non-production — it can never take effect on a deployed build.
 */
export const DEV_SESSION_USER: SessionUser = {
  id: 'dev-user',
  email: 'dev@pumaair.local',
  role: UserRole.SuperAdmin,
  name: 'کاربر توسعه',
};

/** True when the dashboard auth gate should be short-circuited (dev machines only). */
export function isDevAuthBypass(): boolean {
  return process.env.NODE_ENV !== 'production' && process.env.DEV_AUTH_BYPASS !== '0';
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
