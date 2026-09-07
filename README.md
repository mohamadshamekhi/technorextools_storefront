# Abzar Storefront

Conversion-focused public site + secure multi-tenant dashboard, built on **Next.js 15
(App Router)**. Frontend + BFF only — all business logic and persistence live in the
separate **`abzar/api`** service.

## Quick start

```bash
pnpm install
cp .env.example .env.local   # set API_BASE_URL to your running abzar/api
pnpm dev                     # http://localhost:3000
```

## Scripts

| Command             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | Dev server (Turbopack)                   |
| `pnpm build`        | Production build                         |
| `pnpm start`        | Serve the production build               |
| `pnpm lint`         | ESLint (`next lint`, `max-lines` = 150)  |
| `pnpm typecheck`    | `tsc --noEmit`                           |
| `pnpm format`       | Prettier write                           |

## Architecture

See [`cloud.md`](./cloud.md) for the live ledger of routes, features, and state flows,
and [`CLAUDE.md`](./CLAUDE.md) for the working contract.

Key rules:

- **RSC by default.** `'use client'` only at interactive leaf nodes.
- **Feature-based + Atomic.** Global UI in `components/{atoms,molecules,organisms}`;
  everything domain-specific in `features/<domain>/`.
- **No file over 150 lines.** Decompose instead.
- **No `any`.** All boundaries typed with interfaces or Zod-inferred types.
- **Zod everywhere** — env, form input, API responses, JWT payload.
- **Server-only modules** (`lib/api-client`, `lib/session`, `features/*/services/*.api`,
  `*.actions`) must never be imported into client components.

## Environment

All variables are Zod-validated at startup (`src/config/env.ts`). See `.env.example`.
Server-only keys (no `NEXT_PUBLIC_` prefix) never reach the browser bundle.
