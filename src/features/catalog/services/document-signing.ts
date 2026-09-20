import 'server-only';

import { createHmac } from 'node:crypto';

import { env } from '@/config/env';

const TTL_SECONDS = 15 * 60;
const DEV_SECRET = 'dev-only-document-signing-secret';

function secret(): string {
  if (env.DOCUMENT_SIGNING_SECRET) return env.DOCUMENT_SIGNING_SECRET;
  if (env.NODE_ENV === 'production') throw new Error('DOCUMENT_SIGNING_SECRET is required');
  return DEV_SECRET;
}

/**
 * Appends a short-lived HMAC (`exp`, `sig` over path+exp) to a file URL. Minted per request by
 * the BFF route, never at render time, so cached/static pages never carry expired links.
 */
export function signFileUrl(fileUrl: string): string {
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const sig = createHmac('sha256', secret()).update(`${fileUrl}.${exp}`).digest('hex');
  return `${fileUrl}${fileUrl.includes('?') ? '&' : '?'}exp=${exp}&sig=${sig}`;
}
