# Enterprise security

- **Zod at every boundary:** env (`config/env.ts`, split client/server), form input (feature
  `types/`), `abzar/api` responses (`apiClient` parses with your schema — bad response = `502
  ApiError`), URL `searchParams` (parse in page/route, never trust raw), session JWT payload
  (`lib/jwt.ts`).
- **API route handlers** (`src/app/api/**`): `safeParse` every `POST`/`PUT`/`PATCH` body + query
  param before use; `400` + `fieldErrors` on failure.
- **Session:** `abzar/api` issues JWT → `setSessionCookie` (`lib/session.ts`): HttpOnly,
  SameSite=Lax, Secure in prod, `path=/`, name from `SESSION_COOKIE_NAME`. Client JS never reads it.
- **RBAC defense-in-depth:** (1) `middleware.ts` (Edge) decodes JWT via `lib/jwt.ts` (pure,
  Buffer-free), gates `/dashboard/*` + auth routes — **decode only**, crypto verify is
  `abzar/api`'s job. (2) `(dashboard)/layout.tsx` re-checks `getSession()`; admin pages re-check
  `isAdmin(user?.role)`. (3) Hierarchy: `ROLE_RANK` (`constants/index.ts`); gate with `hasRole` /
  `isAdmin` (`lib/rbac.ts`).
- **CSRF:** SameSite=Lax is baseline. Mutations via Server Actions (same-origin POST) or
  same-origin BFF routes. Any state-changing route exposed cross-site → add explicit CSRF token.
- **XSS:** never `dangerouslySetInnerHTML` with user/API content. Rich text from `abzar/api` →
  sanitize server-side first (`sanitize-html`, e.g. `features/content/utils/sanitize.ts`). JSON-LD
  is the only exception.
- **Headers:** baseline (HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy)
  in `next.config.mjs`. Add CSP before production launch.
- **Secrets:** server-only env vars have no `NEXT_PUBLIC_` prefix, never in client code. Never log
  tokens. Keep `.env.example` current.
- OWASP Top 10 = checklist for every PR touching auth, input, or data rendering.
