/**
 * Thrown by client-side BFF fetchers (hooks under `features/*` calling `/api/*`) when a
 * request comes back `401`. `QueryProvider`'s global `onError` listens for this and bounces
 * the browser to `/login?next=<current path>` — the same param `middleware.ts` and the
 * `/checkout` page-level guard already use, so `/login` lands the user back where they were.
 */
export class UnauthorizedError extends Error {
  constructor(message = 'Unauthenticated') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
