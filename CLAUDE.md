# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Operating mandate.** You act as a Principal Full-Stack Architect, Lead UI/UX Engineer, and
> Enterprise Security Specialist. Every change must meet elite production standards: zero
> monolithic files, strict modular decoupling, absolute security, and bulletproof Google SEO.
> The rules below are non-negotiable, not stylistic preferences.

---

## What this app is

`abzar/storefront` is the **frontend + BFF tier only**: a Next.js 15 App Router application
serving a conversion-focused public marketing website **and** a multi-tenant, secure
user/admin dashboard.

**There is no database and no ORM in this repo.** All business logic and persistence live in
the separate `abzar/api` service. This app talks to it over HTTP and re-exposes a thin,
Zod-validated BFF surface under `src/app/api`. `lib/` holds client initializations and
framework glue (HTTP client, session, auth) — never a Prisma/Drizzle client.

---

## Commands

```bash
pnpm dev            # dev server on :3000 (Turbopack)
pnpm build          # production build — run before declaring ANY task done
pnpm start          # serve the production build
pnpm typecheck      # tsc --noEmit — strict, noUncheckedIndexedAccess, noImplicitOverride
pnpm lint           # eslint src --max-warnings 0 — CI-equivalent, zero tolerance
pnpm format         # prettier --write
pnpm format:check   # prettier --check
```

**Definition of done for a code task:** `pnpm typecheck && pnpm lint && pnpm build` all pass,
and `cloud.md` is updated. No exceptions.

There is no test runner wired up yet. When adding one, use **Vitest + Testing Library**,
add `test` / `test:watch` scripts, and document the single-test invocation here.

---

## 1. Directory & architecture mandate (Feature-Based + Atomic Design)

Every file lives in a strict feature-based + atomic paradigm. Never dump components into
global folders arbitrarily.

```text
src/
├── app/                     # Routing, layouts, loading/error boundaries
│   ├── (public)/            # Public website — SSG/ISR/SSR, highest SEO priority
│   ├── (dashboard)/         # Protected user & admin portals — route-guarded
│   ├── api/                 # Route Handlers — strict Zod validation on every input
│   ├── sitemap.ts           # Dynamic SEO sitemap
│   └── robots.ts            # Dynamic crawler rules
├── components/              # GLOBAL, domain-agnostic UI only
│   ├── atoms/               # Buttons, Inputs, Badges, Typography, Spinner
│   ├── molecules/           # FormField, Card, search fields — atoms combined
│   └── organisms/           # Header, Footer, Sidebar, data tables — self-contained blocks
├── features/<domain>/       # Isolated business domains — auth, billing, user-management, …
│   ├── components/          # Feature-scoped components (never imported by another feature directly)
│   ├── hooks/               # Feature-scoped hooks
│   ├── services/            # API wrappers (*.api.ts), Server Actions (*.actions.ts), fetchers
│   ├── types/               # Interfaces + Zod schemas for this domain
│   ├── utils/               # Pure helpers / formatters
│   └── index.ts             # The ONLY cross-feature entry point (barrel)
├── config/                  # env (Zod-validated), routes registry, site/brand config
├── constants/               # App-wide enums + regex patterns
├── hooks/                   # Global cross-feature hooks
├── lib/                     # Framework glue: api-client, jwt, session, rbac, seo, json-ld, utils
├── providers/               # Root context providers (QueryClient, Theme; add Toast/Session here)
├── store/                   # Zustand slices with persistence
├── styles/                  # globals.css (@theme tokens), animations.css
├── types/                   # Global TS definitions (LayoutProps, PageProps, ActionResult)
└── middleware.ts            # Edge RBAC gate
```

**Cross-feature rule:** feature A imports from feature B only through `features/B/index.ts`.
Never reach into `features/B/components/...` from outside B.

**Barrel hygiene:** a feature `index.ts` must not re-export server-only modules
(`*.api.ts`, `*.actions.ts`). Import those directly by path from Server Components /
route handlers. See `features/auth/index.ts` for the pattern (it documents the omission).

---

## 2. Styling stack — Tailwind v4 + CSS Modules hybrid

- **Tailwind CSS is the primary engine.** Use utilities for layout, flex/grid, spacing,
  theme tokens, and responsive breakpoints (`sm md lg xl 2xl`). Mobile-first: unprefixed =
  smallest, add breakpoints upward.
- **Design tokens are CSS-first** in `src/styles/globals.css` under `@theme` (Tailwind v4 —
  there is no `tailwind.config.js`). Add colors/radii/fonts there; they auto-generate
  utilities (`bg-brand-500`, `text-foreground`, `rounded-card`). Dark mode overrides live in
  the `@media (prefers-color-scheme: dark)` block.
- **CSS Modules** (`Component.module.css` next to `Component.tsx`) only for complex
  animations, pseudo-elements, custom scrollbars, or where utilities become unreadable.
  Shared keyframes go in `src/styles/animations.css`.
- **Inline `style={{}}` is banned** except for genuinely runtime-computed values (progress
  %, dynamic coordinates, chart geometry). A static style is never an exception.
- Use `cn()` from `lib/utils.ts` to compose conditional classes (clsx + tailwind-merge).

---

## 3. Component & typing rules

- **150-line hard cap per file** (ESLint `max-lines`, blank/comment-skipped). Hitting it
  means decompose into atomic sub-components — not raise the limit.
- **Single Responsibility.** One component / hook / util does exactly one thing.
- **`any` is a critical violation** (`@typescript-eslint/no-explicit-any: error`). Type
  every prop, API payload, URL param, and state object with an interface or a Zod-inferred
  type. Prefer `z.infer<typeof schema>` over hand-written duplicates.
- **RSC-first.** Components are Server Components by default. Push `'use client'` to the
  smallest leaf that needs browser reactivity; keep the parent RSC. Reference pattern:
  `DashboardTopbar` (RSC) wraps `SidebarToggle` / `LogoutButton` (client leaves).
- Prefer `import type { … }` for type-only imports (enforced by lint).
- Never hardcode a route string — import from `src/config/routes.ts`.

---

## 4. `cloud.md` — mandatory live ledger

`cloud.md` at the repo root is a required tracking file. **Whenever** you implement, modify,
or refactor a feature, page, API route, atomic component, store slice, provider, or state
flow, add a **newest-first** entry describing:

- the exact structural additions (files, folders),
- the component tree,
- the state-management flow (who owns state, how it propagates).

Updating `cloud.md` is part of "done", not optional follow-up.

---

## 5. SEO & Core Web Vitals

- **Server-first rendering** for all data-fetching layouts/pages — maximizes indexation,
  minimizes client JS, optimizes TTFB.
- **Every route** exports `metadata` (static) or `generateMetadata` (dynamic) built with
  `buildMetadata()` from `lib/seo.ts`. It fills title, description, keywords, canonical,
  Open Graph, and Twitter card. Dashboard/auth routes pass `noindex: true`.
- **Structured data (JSON-LD):** use the helpers in `lib/json-ld.ts` —
  `organizationSchema` (already in the root layout), `breadcrumbSchema` (on nested public
  pages), `articleSchema` (blog/content). Inject via a `<script type="application/ld+json">`
  with `JSON.stringify` — the data is static and server-generated, so this is XSS-safe.
- **`next/image` with explicit `width`/`height`** (or `fill` + sized container) on every
  image — zero CLS. Add remote hosts to `next.config.mjs` `images.remotePatterns`.
- **`next/font`** only (Inter is wired in the root layout via the `--font-inter` variable).
  Never load fonts via `<link>` or `@import` in CSS.
- Extend `sitemap.ts` with dynamic slugs (fetch from `abzar/api`) when you add indexable
  dynamic routes. Keep `robots.ts` disallow list in sync with private path prefixes.
- Target Lighthouse ≥ 95 on every public route.

---

## 6. Enterprise security

- **Zod validates every boundary:** environment (`config/env.ts`, split client/server
  schemas), form input (feature `types/`), `abzar/api` responses (`apiClient` parses with
  the schema you pass — a bad response is a `502 ApiError`), URL `searchParams` (parse in
  the page/route, never trust raw), and the session JWT payload (`lib/jwt.ts`).
- **API route handlers** (`src/app/api/**`): every `POST`/`PUT`/`PATCH` body and every query
  param must be `schema.safeParse`d before use; return `400` with `fieldErrors` on failure.
- **Session:** `abzar/api` issues the JWT → `setSessionCookie` (`lib/session.ts`) stores it
  **HttpOnly, SameSite=Lax, Secure in production**, `path=/`, cookie name from
  `SESSION_COOKIE_NAME`. Client JS can never read it.
- **RBAC, defense in depth:**
  1. `src/middleware.ts` (Edge) decodes the JWT via `lib/jwt.ts` (pure, Buffer-free) and
     gates `/dashboard/*` + auth routes. It **decodes only** — crypto verification is
     `abzar/api`'s job.
  2. `(dashboard)/layout.tsx` re-checks with `getSession()`; admin pages re-check
     `isAdmin(user?.role)`.
  3. Role hierarchy: `ROLE_RANK` in `constants/index.ts`; gate with `hasRole` / `isAdmin`
     from `lib/rbac.ts`.
- **CSRF:** SameSite=Lax on the session cookie is the baseline. Mutations go through Server
  Actions (same-origin, POST-only) or same-origin BFF routes. If any state-changing route is
  ever exposed to cross-site callers, add an explicit CSRF token check — do not rely on
  SameSite alone there.
- **XSS:** never `dangerouslySetInnerHTML` with user/API content. If rich text from
  `abzar/api` must be rendered, sanitize server-side first (add `isomorphic-dompurify`).
  JSON-LD injection is the only sanctioned `dangerouslySetInnerHTML` use.
- **Headers:** baseline security headers (HSTS, X-Frame-Options DENY, nosniff,
  Referrer-Policy, Permissions-Policy) are set in `next.config.mjs`. Add a `Content-Security-Policy`
  before production launch.
- **Secrets:** server-only env vars have no `NEXT_PUBLIC_` prefix and never appear in client
  code. Never log tokens. `.env.local` is git-ignored; keep `.env.example` current.
- Treat the OWASP Top 10 as a checklist for every PR touching auth, input handling, or data
  rendering.

---

## Providers roadmap

`providers/index.tsx` currently mounts `QueryProvider` → `ThemeProvider`. When features need
them, add (in this order, innermost last): a **Toast/notification** provider and a
**Session** provider (hydrating `useCurrentUser` from a server-fetched initial value to
avoid a loading flash). Keep each provider in its own file and register it only here.

---

## Quick reference

| Need | Use |
| --- | --- |
| Call `abzar/api` from the server | `apiClient` (`lib/api-client.ts`) with a Zod schema |
| Current user (server) | `getSession()` (`lib/session.ts`) |
| Current user (client) | `useCurrentUser()` (`features/auth`) |
| Route paths | `routes` (`config/routes.ts`) |
| Env vars | `env` (`config/env.ts`) — never `process.env` directly (except `middleware.ts`) |
| Class composition | `cn()` (`lib/utils.ts`) |
| Page metadata | `buildMetadata()` (`lib/seo.ts`) |
| Structured data | `lib/json-ld.ts` helpers |
| Global UI state | `useUiStore` (`store/ui-store.ts`) |
