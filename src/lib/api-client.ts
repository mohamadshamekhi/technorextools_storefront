import 'server-only';

import { cookies } from 'next/headers';
import type { z } from 'zod';

import { env } from '@/config/env';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  /** Attach the caller's session cookie as a Bearer token. Default: true. */
  auth?: boolean;
  /** Next.js fetch cache controls. */
  next?: { revalidate?: number | false; tags?: string[] };
};

/**
 * Server-only HTTP client for the separate `abzar/api` service.
 * Never import this from a Client Component — it reads HttpOnly cookies.
 */
async function request<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
  { body, auth = true, headers, ...init }: RequestOptions = {},
): Promise<z.infer<TSchema>> {
  const finalHeaders = new Headers(headers);
  finalHeaders.set('Content-Type', 'application/json');
  if (env.API_SERVICE_TOKEN) finalHeaders.set('X-Service-Token', env.API_SERVICE_TOKEN);

  if (auth) {
    const token = (await cookies()).get(env.SESSION_COOKIE_NAME)?.value;
    if (token) finalHeaders.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    ...init,
    headers: finalHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      (payload as { message?: string } | null)?.message ?? `Request failed: ${res.status}`;
    throw new ApiError(message, res.status, payload);
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    throw new ApiError('Response validation failed', 502, parsed.error.flatten());
  }
  return parsed.data;
}

/**
 * Multipart variant of `request` — forwards a `FormData` body untouched so the
 * browser/undici boundary header survives. Used by the media-upload BFF route.
 */
async function requestForm<TSchema extends z.ZodTypeAny>(
  path: string,
  schema: TSchema,
  form: FormData,
  { auth = true, headers, ...init }: Omit<RequestOptions, 'body'> = {},
): Promise<z.infer<TSchema>> {
  const finalHeaders = new Headers(headers);
  if (env.API_SERVICE_TOKEN) finalHeaders.set('X-Service-Token', env.API_SERVICE_TOKEN);

  if (auth) {
    const token = (await cookies()).get(env.SESSION_COOKIE_NAME)?.value;
    if (token) finalHeaders.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${env.API_BASE_URL}${path}`, {
    ...init,
    method: 'POST',
    headers: finalHeaders,
    body: form,
  });

  const payload = res.status === 204 ? null : await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      (payload as { message?: string } | null)?.message ?? `Request failed: ${res.status}`;
    throw new ApiError(message, res.status, payload);
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    throw new ApiError('Response validation failed', 502, parsed.error.flatten());
  }
  return parsed.data;
}

export const apiClient = {
  get: <S extends z.ZodTypeAny>(path: string, schema: S, opts?: RequestOptions) =>
    request(path, schema, { ...opts, method: 'GET' }),
  post: <S extends z.ZodTypeAny>(path: string, schema: S, opts?: RequestOptions) =>
    request(path, schema, { ...opts, method: 'POST' }),
  postForm: <S extends z.ZodTypeAny>(
    path: string,
    schema: S,
    form: FormData,
    opts?: Omit<RequestOptions, 'body'>,
  ) => requestForm(path, schema, form, opts),
  put: <S extends z.ZodTypeAny>(path: string, schema: S, opts?: RequestOptions) =>
    request(path, schema, { ...opts, method: 'PUT' }),
  patch: <S extends z.ZodTypeAny>(path: string, schema: S, opts?: RequestOptions) =>
    request(path, schema, { ...opts, method: 'PATCH' }),
  delete: <S extends z.ZodTypeAny>(path: string, schema: S, opts?: RequestOptions) =>
    request(path, schema, { ...opts, method: 'DELETE' }),
};
