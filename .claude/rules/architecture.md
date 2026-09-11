# Directory & architecture (Feature-Based + Atomic Design)

```text
src/
├── app/                  Routing, layouts, loading/error boundaries
│   ├── (public)/         Public site — SSG/ISR/SSR, top SEO priority
│   ├── (dashboard)/      Protected portals — route-guarded
│   ├── api/              Route Handlers — strict Zod on every input
│   ├── sitemap.ts robots.ts
├── components/           GLOBAL domain-agnostic UI: atoms / molecules / organisms
├── features/<domain>/    Isolated domains (auth, billing, …)
│   ├── components/ hooks/ services/ (*.api.ts, *.actions.ts, fetchers — server-only)
│   ├── data/             Static/pure content (copy, nav, presentation constants) — no I/O
│   ├── types/ (interfaces + Zod) utils/ (pure)
│   └── index.ts          ONLY cross-feature entry (barrel)
├── config/ constants/ hooks/ lib/ providers/ store/ styles/ types/
└── middleware.ts         Edge RBAC gate
```

- **Cross-feature:** feature A imports feature B only via `features/B/index.ts`. Never reach into
  `features/B/components/...`.
- **Barrel hygiene:** feature `index.ts` must not re-export server-only modules (`*.api.ts`,
  `*.actions.ts`) — import those by path from Server Components / route handlers. Pattern:
  `features/auth/index.ts`.
- Never hardcode a route string — import from `src/config/routes.ts`.
