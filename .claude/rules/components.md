# Components & typing

- **150-line hard cap/file** (ESLint `max-lines`, blank/comment-skipped). Hitting it = decompose,
  not raise the limit.
- **Single Responsibility** — one component/hook/util does one thing.
- **`any` = critical violation** (`no-explicit-any: error`). Type every prop, payload, URL param,
  state object. Prefer `z.infer<typeof schema>` over hand-written duplicates.
- **RSC-first** — Server Components by default; push `'use client'` to the smallest leaf. Pattern:
  `DashboardTopbar` (RSC) wraps `SidebarToggle`/`LogoutButton` (client leaves).
- Prefer `import type { … }` (lint-enforced).
- **Before any edit:** read 1-2 sibling files in the same feature/dir first and match their
  naming, import style, and state pattern exactly — never introduce a new file/folder shape
  without an explicit architectural reason. Note: features use `data/` (static content, no I/O)
  distinct from `services/` (server-only fetchers/actions) — see `architecture.md`.
- **Fix on touch:** in any file you edit (plus its direct imports/importers), silently fix type
  errors, `noUncheckedIndexedAccess` null/undefined gaps, obvious race conditions in state, and
  Zod/`abzar/api` schema mismatches you notice — one line in your reply on what/why, no separate
  request needed. Don't go hunting unrelated files for this.
- **Design/UX on touch:** in any component you edit, fix in place — missing `width`/`height` (or
  `fill` + sized container) on `next/image`, non-mobile-first breakpoints, obvious contrast/a11y
  issues, static `style={{}}` that should be Tailwind tokens, conditional classes not using `cn()`,
  and utility-chain animations that belong in a CSS Module. If the fix is a large/subjective visual
  change, report it instead of guessing — don't apply it.

## Providers roadmap

`providers/index.tsx` mounts `QueryProvider` → `ThemeProvider`. Add when needed (innermost last):
Toast/notification, then Session (hydrate `useCurrentUser` from server-fetched initial to avoid
flash). One provider per file, registered only here.
