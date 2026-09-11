# SEO & Core Web Vitals

- Server-first rendering for all data-fetching layouts/pages.
- **Every route** exports `metadata` / `generateMetadata` via `buildMetadata()` (`lib/seo.ts`) —
  fills title, description, keywords, canonical, OG, Twitter. Dashboard/auth → `noindex: true`.
- **JSON-LD:** `lib/json-ld.ts` helpers — `organizationSchema` (root layout), `breadcrumbSchema`
  (nested public pages), `articleSchema` (content). Inject via `<script type="application/ld+json">`
  + `JSON.stringify` (static, server-generated → XSS-safe). This is the ONLY sanctioned
  `dangerouslySetInnerHTML`.
- **`next/image`** with explicit `width`/`height` (or `fill` + sized container) on every image —
  zero CLS. Remote hosts → `next.config.mjs` `images.remotePatterns`.
- **`next/font`** only (Inter via `--font-inter`). Never `<link>` / CSS `@import` fonts.
- Keep `sitemap.ts` dynamic slugs and `robots.ts` disallow list in sync with private prefixes.
- Target Lighthouse ≥ 95 on every public route.
