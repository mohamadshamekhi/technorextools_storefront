import { z } from 'zod';

/**
 * Edge-safe JWT payload decoding. Pure — no `next/headers`, no Node Buffer —
 * so it is importable from both middleware (Edge) and Server Components.
 *
 * This DECODES only; cryptographic verification is `abzar/api`'s job.
 *
 * Mirrors `abzar/api`'s access-token payload (`modules/auth/token.types.ts`
 * `tokenPayloadSchema`): `{sub, mobile, role}` + `exp`/`iat` added by `jwt.signAsync`.
 * There is no email/name in the token — this is mobile+OTP auth, and permissions are
 * resolved per-request server-side, never carried here. Full profile (fullName, email)
 * comes from `GET /auth/me` when needed, not from the session cookie.
 */
const jwtPayloadSchema = z.object({
  sub: z.string(),
  mobile: z.string(),
  role: z.string(),
  exp: z.number(),
});

export type SessionUser = {
  id: string;
  mobile: string;
  /** Role slug (`abzar/api`'s DB-driven role table) — see `constants/index.ts` `UserRole`. */
  role: string;
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
    const { sub, mobile, role } = parsed.data;
    return { id: sub, mobile, role };
  } catch {
    return null;
  }
}
