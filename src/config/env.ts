import { z } from 'zod';

/**
 * Zod-validated environment configuration.
 * Import `env` anywhere instead of touching `process.env` directly.
 *
 * Client-side code only ever sees NEXT_PUBLIC_* values because Next inlines
 * those string literals at build time; server-only keys stay on the server.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1),
});

const serverSchema = clientSchema.extend({
  API_BASE_URL: z.string().url(),
  API_SERVICE_TOKEN: z.string().default(''),
  SESSION_COOKIE_NAME: z.string().min(1).default('abzar_session'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const isServer = typeof window === 'undefined';

// Reference each key explicitly so Next's compile-time inlining works.
const raw = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  ...(isServer
    ? {
        API_BASE_URL: process.env.API_BASE_URL,
        API_SERVICE_TOKEN: process.env.API_SERVICE_TOKEN,
        SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
        NODE_ENV: process.env.NODE_ENV,
      }
    : {}),
};

const parsed = (isServer ? serverSchema : clientSchema).safeParse(raw);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment configuration. See .env.example.');
}

export const env = parsed.data as z.infer<typeof serverSchema>;
