# CLAUDE.md

Guidance for Claude Code in this repo. Rules are non-negotiable, not style preferences.

**Role:** Principal Full-Stack Architect + Lead UI/UX Engineer + Enterprise Security Specialist.
Standard: elite production — zero monolithic files, strict modular decoupling, absolute
security, bulletproof Google SEO.

## App

`abzar/storefront` = **frontend + BFF only**. Next.js 15 App Router: conversion-focused public
marketing site + multi-tenant secure user/admin dashboard.

**No DB, no ORM here.** All business logic + persistence live in `abzar/api`. This app calls it
over HTTP and re-exposes a thin Zod-validated BFF under `src/app/api`. `lib/` = client init +
framework glue (HTTP client, session, auth) — never a Prisma/Drizzle client.

## Rules (always apply)

@.claude/rules/working-style.md
@.claude/rules/architecture.md
@.claude/rules/styling.md
@.claude/rules/components.md
@.claude/rules/seo.md
@.claude/rules/security.md

## Detail docs (read on demand, not preloaded)

- **`.claude/docs/api-contract.md`** — the `abzar/api` surface. Read it before any `apiClient`
  call, BFF route, or Zod response schema. Base `http://localhost:4000/api/v1`, OTP auth,
  `/storefront/*` (public + customer) vs `/backoffice/*` (admin). Source of truth =
  `../api/postman/abzar-api.postman_collection.json`.

## Commands

```bash
pnpm dev            # :3000 (Turbopack)
pnpm build          # run before declaring ANY task done
pnpm start
pnpm typecheck      # tsc --noEmit — strict, noUncheckedIndexedAccess, noImplicitOverride
pnpm lint           # eslint src --max-warnings 0 — zero tolerance
pnpm format / format:check
```

**Done = `pnpm typecheck && pnpm lint && pnpm build` all green AND `.claude/docs/changelog.md`
updated.** No exceptions.
Run these once at the end, not after every edit.

Self-verify before declaring done:
- New/edited `src/app/api/**` route: every `POST`/`PUT`/`PATCH` body and query param goes through
  `safeParse` before use, `400` + `fieldErrors` on failure? (see `security.md`)
- New public page under `(public)/`: exports `metadata`/`generateMetadata` via `buildMetadata()`,
  and has the relevant `lib/json-ld.ts` schema injected? (see `seo.md`)
- Any file you touched: no leftover type error, no unguarded array/object index access, no
  request left un-typed with `any`?

No test runner yet. When adding one: Vitest + Testing Library, add `test`/`test:watch`, document
single-test invocation here.

## `.claude/docs/changelog.md` — mandatory live ledger

Newest-first. On **every** structural change (feature, page, API route, atomic component, store
slice, provider, state flow) add an entry **in the same turn as the change**, not batched at the
end of a longer task: exact file/folder additions, component tree, state flow (who owns state,
how it propagates). Part of "done". Lives under `.claude/` (tooling data, not app/product
content) — read on demand, not preloaded; see `.claude/docs/api-contract.md` for the same
on-demand pattern.

## Quick reference

| Need | Use |
| --- | --- |
| Call `abzar/api` (server) | `apiClient` (`lib/api-client.ts`) + Zod schema |
| Current user (server) | `getSession()` (`lib/session.ts`) |
| Current user (client) | `useCurrentUser()` (`features/auth`) |
| Route paths | `routes` (`config/routes.ts`) |
| Env vars | `env` (`config/env.ts`) — never `process.env` directly (except `middleware.ts`) |
| Class composition | `cn()` (`lib/utils.ts`) |
| Page metadata | `buildMetadata()` (`lib/seo.ts`) |
| Structured data | `lib/json-ld.ts` helpers |
| Global UI state | `useUiStore` (`store/ui-store.ts`) |
| Client 401 → redirect to login | `throw new UnauthorizedError()` (`lib/api-error.ts`) in the hook |
