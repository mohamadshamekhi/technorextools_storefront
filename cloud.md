# cloud.md — Live Workspace Ledger

> Update this file on every structural change: new feature, page, API route, atomic
> component, store slice, or refactor. Keep entries newest-first.

---

## 2026-09-07 — Dev-only dashboard auth bypass

`abzar/api` auth is not runnable locally, so `/dashboard/*` was unreachable. Added a
hard dev-gated escape hatch: a mock super-admin session (`DEV_SESSION_USER`) that
stands in when there is no real API-issued session.

- **`lib/jwt.ts`** (edge-pure): `DEV_SESSION_USER` + `isDevAuthBypass()` —
  `NODE_ENV !== 'production' && process.env.DEV_AUTH_BYPASS !== '0'`. Cannot ever
  fire on a production build.
- **`lib/session.ts`**: `getSession()` falls back to `DEV_SESSION_USER` when no
  cookie/token and bypass is on.
- **`middleware.ts`**: same fallback for the Edge gate; the auth-route redirect
  still keys off the *real* token so `/login` stays reachable while bypassing.
- **`app/api/auth/me/route.ts`**: on `authApi.me()` failure, returns the mock
  session instead of 502 when bypass is on (keeps client `useCurrentUser` happy).
- **`.env.example` / `.env.local`**: `DEV_AUTH_BYPASS=1` documented; set `0` to
  exercise the real gate in dev.

No new components or state flow. Remove this once real auth is wired.

---

## 2026-09-07 — Order tracking (`/order-tracking`) — new `features/order-tracking/`

Implemented the last un-built mockup ("Puma Air Order Tracking"): a public guest
lookup of an order's fulfilment status by order code + mobile number. No auth, no
DB — fixture-backed, ready to swap for an `abzar/api` call.

### Route

- **`(public)/order-tracking/page.tsx`** — RSC. `buildMetadata` (indexable) +
  `breadcrumbSchema([خانه, پیگیری سفارش])`. Renders the one client island.

### `features/order-tracking/`

| Area | Files |
| --- | --- |
| types | `trackingFormSchema` (Zod: `PA-######` code + `09xxxxxxxxx` mobile), `TrackedOrder` / `TimelineStep` / `TrackedItem` / `TrackingStatus` |
| data | `orders.ts` — `DEMO_ORDERS` fixture + `findDemoOrder(code, mobile)` (case-insensitive code, exact mobile) |
| hooks | `use-order-tracking.ts` — `safeParse` → `findDemoOrder` → `{ order, error }` |
| components | `order-tracking-view` (client orchestrator) → `tracking-hero` → `tracking-form` (client, 2 inputs + submit + alert); `tracking-result` → `tracking-timeline` (flex dot-rail, done = index ≤ current status), `shipping-info` (carrier + `IR…` parcel no.), `tracked-items` |
| index.ts | exports `OrderTrackingView`, `trackingFormSchema`, `TrackedOrder`/`TrackingStatus` |

State flow: all state client-side in `useOrderTracking` (owned by
`OrderTrackingView`). Form fields are local `useState` in `TrackingForm`, lifted to
the hook only on submit. No store slice, no URL state, no server round-trip — the
result panel mounts conditionally when a fixture matches.

Wiring: `routes.orderTracking = '/order-tracking'` (+ `PUBLIC_PATHS`); `PrimaryNav`
"پیگیری سفارش" link and checkout `SuccessStep` "پیگیری سفارش" link both repointed
here (were `/dashboard` and `/contact`); `sitemap.ts` += route (0.4 monthly).

Verified: `typecheck` + `lint` + `build` green.

---

## 2026-09-07 — Journal/blog (`/blog` + `/blog/[slug]`) — new `journal-page/` family

Replaced the placeholder journal with the full "مجله پوما ایر" (mockup "Puma Air Blog").
Index is server-filtered via `?cat=` (Zod-validated, noindex on filtered views —
canonical index only); the mockup's client tabs became crawlable `<Link>` pills.

### Routes

- **`(public)/blog/page.tsx`** — hero (stats + tabs), trending marquee strip, pinned
  featured card, 3-col grid, `NewsletterCta`. JSON-LD: breadcrumb + ItemList.
  `generateMetadata` mirrors `?cat=` for noindex.
- **`(public)/blog/[slug]/page.tsx`** — SSG (`generateStaticParams` over all 13
  articles), breadcrumb nav, category chip, meta row, ArticleBody prose, related
  links. JSON-LD: breadcrumb + `articleSchema`. Unknown slug → `notFound()`.

### `features/marketing/`

| Area | Files |
| --- | --- |
| types | `JournalCategory`, `JournalArticle`, `ArticleBlock` |
| data | `journal.ts` (13 articles + `FEATURED_SLUG` + `AUTHOR_NAME`), `journal-taxonomy.ts` (5 categories w/ chip classes + `JOURNAL_TRENDING`), `journal-bodies.ts` (`ARTICLE_BODIES` h/p blocks) |
| utils | `journal-params.ts` (`journalParamsSchema`, `toJournalList`), `journal-detail.ts` (`findArticle`, `relatedArticles`) |
| components/journal-page | `journal-hero` (+ `CategoryTabs`), `journal-sections` (`TrendingStrip`/`FeaturedArticle`/`JournalList`+card), `article-body` |

State flow: zero client state — filter lives in the URL (`?cat=slug`), server
re-renders; marquee/pulse are pure CSS; tag colors are per-category full class
literals (Tailwind-safe). Category split out of `journal.ts` to respect the
150-line cap.

Supporting: `icon-paths.ui.tsx` += `fire`, `scale`. Sitemap += all article slugs
(0.6 monthly). Barrel exports hero/strip/featured/list + params/detail utils.

Verified: `typecheck` + `lint` + `build` green; `/blog` ƒ SSR, `/blog/[slug]` ● SSG
×13.

---

## 2026-09-06 — About page (`/about`) — new `about-page/` section family

Replaced the English placeholder on `(public)/about` with the full Persian "درباره ما"
page (mockup "Puma Air About"). Server-rendered end to end; only client leaves are
`CountUp` (stats sweep) and the CSS-only `Reveal` entrances.

### Routes

- **`(public)/about/page.tsx`** — Persian `buildMetadata` (indexable) +
  `breadcrumbSchema([خانه, درباره ما])`; composes seven RSC sections.

### `features/marketing/components/about-page/`

| Component | Role |
| --- | --- |
| `about-hero` | Story badge + headline + intro over two ambient blobs |
| `mission-section` | Workshop media placeholder + checklist (3 assurance points) |
| `stats-band` | Dark `bg-ink` band; `CountUp` counters (۱۴+/۱۲۰۰۰+/۳۵۰+/۴۰+) |
| `timeline-section` | Alternating vertical timeline ۱۳۹۱→۱۴۰۵, center rail on lg, start-rail on mobile |
| `values-section` | 4 trust cards reusing `about/pillar-card` (award/handshake/wrench/headset) |
| `team-section` | 4 portrait placeholders + name/role |
| `about-cta` | Orange wholesale banner → `routes.contact`, drifting blob |
| `about-eyebrow` / `about-section-heading` | Shared pill kicker + centered heading pair |
| `about-cta-blob` | Decorative blob extracted to respect single responsibility |

### Supporting changes

- `data/about.ts` — `ABOUT_MISSION_POINTS`, `ABOUT_STATS`, `ABOUT_TIMELINE`,
  `ABOUT_VALUES`, `ABOUT_TEAM`; types `TimelineEntry` / `TeamMember` added to
  `marketing/types`.
- `animations.css` += `blob-float` keyframes + `animate-blob` utility
  (`prefers-reduced-motion` collapses it via the existing global reset).
- `icon-paths.ui.tsx` += `award`; `icon-paths.tools.tsx` += `handshake`.
- Barrel (`features/marketing/index.ts`) exports the seven sections.

State flow: fully static RSC — no store, no URL state; scroll entrances are pure CSS,
stat sweep is the existing `CountUp` IntersectionObserver leaf.

Verified: `typecheck` + `lint` + `build` green; `/about` prerendered static (○).

---

## 2026-09-05 — Customer account dashboard (`/dashboard/*`) — new `features/account/`

Rebuilt the `(dashboard)` route group from the generic SaaS scaffold into the
storefront's Persian, RTL customer account area (mockup "Puma Air Dashboard").
Every route `noindex`; still gated by `middleware.ts` (Edge) + the layout's
`getSession()` (defense in depth). The mockup's client-side tab SPA is split into
six real routes so each is server-rendered and directly linkable.

### Routes (`app/(dashboard)/`)

- **`layout.tsx`** — now just `getSession()` gate → `<AccountShell user>`. The old
  `DashboardTopbar` / `DashboardSidebar` (English SaaS chrome) are no longer
  mounted here (files left in place, unused).
- **`dashboard/page.tsx`** → `OverviewView` · **`dashboard/orders`** → `OrdersView`
  · **`dashboard/addresses`** → `AddressesView` · **`dashboard/account`** →
  `AccountView` · **`dashboard/wishlist`** → `WishlistView` ·
  **`dashboard/notifications`** → `NotificationsView`. Pages that need the user
  (`overview`, `account`) re-check `getSession()` and pass `SessionUser` down.
- `routes.dashboard` gains `orders` / `addresses` / `profile` / `wishlist` /
  `notifications`.
- `icon-paths.ui.tsx` += `clock`, `gift`, `pencil`, `logout`.

### `features/account/`

| Area | Files |
| --- | --- |
| types | `Order`/`OrderStatus`/`OrderStatusMeta`, `Address`, `WishlistItem`, `AccountNotification`, `StatCard`, `TrendPoint`, `AccountNavItem` |
| data | `orders.ts` (`ORDERS` + `ORDER_STATUS_META` + `FULFILMENT_STAGES`), `addresses.ts`, `wishlist.ts`, `notifications.ts` (+ `UNREAD_COUNT`), `overview.ts` (`STAT_CARDS`, `PURCHASE_TREND`, `MEMBERSHIP`), `nav.ts` (`ACCOUNT_NAV`) |
| utils | `orders.ts` — `statusMeta`, `itemCountLabel` |

Shell (RSC, client only on leaves): `AccountShell` → `AccountTopbar` (logo + bell
badge + avatar) + `AccountSidebar` (profile chip + nav + `AccountLogoutButton`) +
`AccountMobileNav` (horizontal-scroll nav shown < lg). `AccountNavLink` (client)
resolves active state via `usePathname`. `AccountLogoutButton` (client) calls
`logoutAction` directly with Persian copy.

Content components: `page-heading` (shared), `stat-card` + `stat-card-grid`,
`purchase-trend-card` (pure-CSS bar chart), `membership-card` (dark, `bg-ink`),
`recent-orders` + `order-row` (compact) + `order-status-badge`, `order-list`
(client — status filter) + `order-filter-tabs` (client) + `order-card` (client —
expand) + `order-timeline` (4-stage stepper), `address-card` + `add-address-button`,
`account-form` (client, visual — submit wires with `abzar/api`), `wishlist-card`
(client — optimistic remove), `notification-row`. Each `*-view` composes one
page. Barrel exports the shell + the six views only.

State flow: shell chrome is fully static RSC; the two interactive surfaces
(`OrderList` status filter + expanded card, `WishlistCard` remove) own local
`useState` — no store slice, no URL sync (single-visit account views).

Verified: `typecheck` + `lint` + `build` green; screenshots at 1360/1200/390px
across all six routes with a seeded session cookie, zero horizontal overflow.

---

## 2026-09-05 — Category landing pages (`/categories/[slug]`)

Per-department landing + catalog page, built on the existing catalog machinery
(mockup "Puma Air Category"). SSG for every stocked department, indexable.

### Route

- **`app/(public)/categories/[slug]/page.tsx`** — `generateStaticParams` over
  `stockedCategories()` (6 pages today; `measurement`/`spare-parts` have no mock
  products so they render on-demand + show the empty state). `generateMetadata`
  builds `خرید {title} صنعتی` title + the category `description`; `noindex` only when
  the visitor adds a *non-category* filter. JSON-LD: `breadcrumbSchema` +
  `itemListSchema` of the department's products. Renders `CategoryHero` →
  `PromoTicker` → `CategoryLanding`.
- `routes.category(slug)` = `/categories/${slug}`; `/categories` added to
  `PUBLIC_PATHS`. `sitemap.ts` emits every stocked category at priority 0.85.
- **`CategoryRailItem`** (home dept rail) now links to `routes.category(slug)`
  instead of the search page.

### `features/marketing` additions

| File | Role |
| --- | --- |
| `data/categories.ts` | `Category` type gains `description`; all 8 entries filled with SEO copy |
| `utils/category.ts` | `findCategory`, `stockedCategories`, `categoryProductCount` |
| `components/category/category-hero.tsx` | RSC — breadcrumb + tinted icon badge + title + description + count banner |
| `components/category/category-chips.tsx` | RSC — sibling-department pill nav, current = filled |
| `components/category/category-landing.tsx` | client — catalog scoped to one slug |

### Reused / parameterised

- **`useCatalogFilters(initial, { basePath?, lockedCategories? })`** — `basePath`
  chooses which path the URL mirror writes (`/products` default, `/categories/x`
  here); `lockedCategories` keeps the department pinned through `reset()` and omits
  it from the serialised query.
- **`CatalogSidebar`** gains `hideCategories` — the category facet is dropped on a
  page already scoped to one department; brand facet is narrowed to brands present
  in that category.
- `CategoryLanding` composes the existing `CatalogToolbar` / `ActiveFilterChips` /
  `CatalogResults` / `LoadMoreButton` / `MobileFilterDisclosure` / `CatalogEmpty`.

State flow: page parses `searchParams` → injects `categories:[slug]` → passes as
`initial` to `CategoryLanding`, which owns filter/sort/view state via
`useCatalogFilters` and mirrors it to `/categories/[slug]?…` with `history.replaceState`.

Verified: `typecheck` + `lint` + `build` green (6 category pages prerendered);
screenshots at 1360px & 390px + empty-state, zero horizontal overflow.

---

## 2026-09-05 — Cart (`/cart`) visual redesign — depth, colour, sale signalling

User feedback: the cart page felt "بی‌روح" (lifeless) — flat grey placeholders, thin
hairline borders, no colour beyond brand orange. Redesign reuses the site's existing
**category icon-chip** language (each `Category` carries `icon`/`tint`/`ink`) plus
elevation and sale cues. No layout/route changes; still `noindex`, still RSC-first
(client leaves unchanged).

### Store / data

- **`store/cart-store.ts`** — `CartLine` gains `compareAt?: number | null` (pre-discount
  unit price) and `categorySlug?: string` (drives the coloured badge). `addItem` signature
  unchanged — new fields flow through `Omit<CartLine,'quantity'>`.
- Threaded `compareAt` + `categorySlug` into all three `addItem` call sites:
  `AddToCartButton`, `ProductBuyBox` (marketing), `UpsellAddButton` (cart).
- **`features/cart/types` `ShippingMethod`** += `icon: IconName`; **`data/shipping.ts`**
  sets `truck` (standard) / `bolt` (express).
- **`features/marketing/index.ts`** now also exports `CATEGORIES`, `type Category`,
  `type Product` so the cart feature resolves categories through the barrel.

### New components / utils (`features/cart/`)

| File | Role |
| --- | --- |
| `utils/category-lookup.ts` | `categoryFor(slug)` → `Category` from `@/features/marketing` |
| `components/product-media-badge.tsx` | RSC — absolutely-positioned coloured icon chip on a product placeholder; `null` when no category |
| `components/cart-quantity-control.tsx` | client — rounded-pill stepper (`plus` icon + `−` glyph), extracted from the row to stay under 150 lines |
| `components/cart-heading.tsx` | RSC — `cart` icon chip + "سبد خرید شما (N کالا)" title, mirroring the `CartUpsells` heading |

### Redesigned

- **`CartItemRow`** — `shadow-sm` + `hover:-translate-y-0.5 hover:shadow-md`; media wrapped
  in `relative` + `ProductMediaBadge`; `variant` now a `bg-surface-sunken` pill; on-sale
  lines show the `bg-sale` `٪X` badge + struck-through `compareAt` (per unit, matching
  `ProductPrice`); new `CartQuantityControl`; حذف button muted → `hover:text-sale`.
  New props: `categorySlug`.
- **`CartItemList`** — takes `resolveCategory: (line) => slug | undefined`, forwards per row.
- **`CartPageView`** — builds `Map<productId, categorySlug>` from `upsellPool` (= full
  `PRODUCTS`); `resolveCategory = line.categorySlug ?? map.get(line.id)`; swaps the plain
  `<h1>` for `<CartHeading>`.
- **`FreeShippingBar`** — tinted icon chip; **celebratory green state at 100%** (green
  border/bg/track + `check` icon + "ارسال این سفارش رایگان شد 🎉"); `shadow-sm`.
- **`OrderSummary`** — `<p>خلاصه سفارش</p>` → `cart` icon-chip header; card gets `shadow-sm`.
- **`ShippingOption`** — icon chip (`method.icon`) between radio and label, filled
  `bg-brand-500` when selected — matches checkout's `PaymentOption`.
- **`OrderSummaryLines`** — highlighted green "شما … صرفه‌جویی کردید" savings row when
  `totals.discount > 0`.
- **`UpsellCard`** — `relative` media + `ProductMediaBadge`; `shadow-sm` +
  `hover:-translate-y-1 hover:shadow-md`.

Verified: `typecheck` + `lint` + `build` green; screenshots at 1360px & 390px, zero
horizontal overflow (`scrollWidth === clientWidth`).

---

## 2026-09-04 — Checkout (`/checkout`) — new `features/checkout/` domain, distraction-free shell

### Routes

- **New `app/(checkout)/` group** — replaces the old `(public)/checkout` placeholder.
  `layout.tsx` renders `CheckoutTopbar` only (logo + pulsing "پرداخت امن و
  رمزنگاری‌شده" badge) — no store header/nav/search/cart, matching the mockup's
  distraction-free checkout chrome (a standard pattern for cutting checkout abandonment).
  `checkout/page.tsx` renders `CheckoutPageView`, `noindex`.
- `/checkout` added to `PUBLIC_PATHS` (already in `robots.ts` disallow from the cart entry).

### `features/checkout/` (all new)

| Area | Files |
| --- | --- |
| types | `types/index.ts` — `CheckoutStep`, `Address`, `CheckoutPaymentMethod`, `PlacedOrder` |
| data | `data/addresses.ts`, `data/payment-methods.ts` (mock) |
| hooks | `use-checkout.ts` — address → payment → review → success state machine; `confirm(lines, total)` snapshots a `PlacedOrder` *before* the cart is cleared |

Components: `CheckoutStepper` (3-dot progress, done/active/upcoming), `CheckoutNextButton`
(shared forward/back pill — arrow leads+reversed for back, trails plain for forward),
`AddressStep` → `AddressCard` + `NewAddressForm` (visual-only scratch form), `PaymentStep`
→ `PaymentOption`, `ReviewStep` → `ReviewSection` (reusable edit-card) + `ReviewItemRow`,
`SuccessStep` (reuses the `auth-pulse`/`auth-pop` keyframes), `CheckoutSummarySidebar`,
`EmptyCheckout`, `CheckoutTopbar`. `CheckoutPageView` (client) ties it together — reads
`useCartStore` directly (same hydration-guard pattern as `CartPageView`), shows
`EmptyCheckout` when the cart is empty and the flow hasn't reached `success`, and **clears
the cart on confirm** (a real behavior the static mockup didn't have, since it only had
mock data).

### Fixed while building this

Two real overflow bugs (Tailwind's classic "flex/grid child won't shrink below its
max-content" trap), caught via headless-Chrome `scrollWidth` diagnostics at 390px width:
`CheckoutSummarySidebar`'s truncated line-item span needed `min-w-0 flex-1` (a
`truncate` span without it never actually shrinks), and the `grid lg:grid-cols-[1fr_*px]`
wrapper in both `CheckoutPageView` and `CartPageView` needed `min-w-0` on itself and its
children (an implicit grid track sizes to its widest descendant's max-content otherwise).
Both pages re-verified at 390px with zero horizontal scroll after the fix.

### Shared

- `icon-paths.tools.tsx` += `cash`, `pin`.

---

## 2026-09-04 — Cart (`/cart`) + checkout placeholder — new `features/cart/` domain

### Routes

- **`app/(public)/cart/page.tsx`** — RSC shell (`noindex`), renders `CartBreadcrumb` +
  `CartPageView`. Static, ~3.9 kB page.
- **`app/(public)/checkout/page.tsx`** — RSC placeholder ("پرداخت به‌زودی راه‌اندازی
  می‌شود") so the checkout button is never a dead link; links back to `/cart`.
- `routes.cart`, `routes.checkout` added; both added to `PUBLIC_PATHS`; `/cart` and
  `/checkout` added to `robots.ts` disallow (transactional, no SEO value).
- `CartButton` (header) now links to `routes.cart` instead of `routes.account`.

### Store

`store/cart-store.ts` — `CartLine` gained an optional `variant` (e.g. "آبی · ۱/۲ اینچ
استاندارد", set by `ProductBuyBox` from the selected color/model); added `setQuantity(id,
quantity)` (drops the line at `0`) and a `selectCartSubtotal` selector alongside the
existing `selectCartQuantity`.

### `features/cart/` (all new)

| Area | Files |
| --- | --- |
| types | `types/index.ts` — `ShippingMethod(Key)`, `CouponFeedback`, `CartTotals` |
| data | `data/shipping.ts` (`FREE_SHIPPING_THRESHOLD`, `SHIPPING_METHODS`) · `data/coupons.ts` (mock `PUMA10`/`PUMA20`) |
| utils | `utils/pick-upsells.ts` — in-stock products not already in the cart |
| hooks | `use-cart-totals.ts` (subtotal → discount → shipping → total) · `use-coupon.ts` (input/apply/feedback) |

Components: `CartBreadcrumb`, `FreeShippingBar`, `CartItemList` → `CartItemRow` (qty
stepper + remove; mobile stacks image/title/price, `sm:` switches to a 3-column grid),
`OrderSummary` (owns shipping-method + coupon state, composes `CouponField`,
`CouponMessage`, `ShippingMethods` → `ShippingOption`, `OrderSummaryLines`,
`CheckoutButton`), `CallForOrderBox`, `CartUpsells` → `UpsellCard` → `UpsellAddButton`,
`EmptyCart`. `CartPageView` (client) ties it together — reads `useCartStore`, guards
against the SSR/localStorage hydration flash (same pattern as `useCartQuantity`), and
renders `EmptyCart` when there are no lines.

### Shared cleanup

- Persian number formatting (`toPersianDigits`, `formatToman`, `discountPercent`) moved
  to **`lib/persian.ts`** (was `features/marketing/utils/persian.ts`, now a re-export
  shim so existing imports keep working). `features/auth/utils/format-fa.ts` builds on
  the same helper instead of duplicating it.
- `icon-paths.ui.tsx` += `trash`, `plus`.
- `features/marketing/index.ts` += `export type { Product }`.

---

## 2026-09-04 — Sign-in (`/login`) — phone + OTP flow, split screen

Replaces the email/password login with a Persian phone → OTP → (profile) → done flow.
`LoginForm` / `RegisterForm` and `loginAction` / `registerAction` were removed;
`auth.api.ts` + `logoutAction` + the token schemas stay for when `abzar/api` lands.

### Routes

- New **`app/(auth)/`** group (root layout only — no store header/footer).
- `(auth)/login/page.tsx` — RSC, `noindex`, renders `<AuthSplit><PhoneAuthFlow/></AuthSplit>`.
  Static, ~228 B page.
- `(auth)/register/page.tsx` — `permanentRedirect(routes.auth.login)` (the flow routes a new
  number to the profile step itself).
- Deleted `(public)/login/`, `(public)/register/`.

### `features/auth/` additions

| Area | Files |
| --- | --- |
| types | `types/phone-auth.ts` — `phoneSchema` · `otpSchema` · `profileSchema` (Zod), `AuthStep`, `OTP_LENGTH`, `RESEND_SECONDS`; re-exported from `types/index.ts` |
| data | `data/auth-content.ts` — `AUTH_TRUST_POINTS`, panel copy |
| services | `services/phone-auth.service.ts` — client mock (`requestOtp` / `verifyOtp` / `persistSession`); demo: `09121234567` = existing user, `00000` = rejected code |
| utils | `utils/format-fa.ts` — `toFaDigits`, `formatPhoneFa` |
| hooks | `use-phone-auth.ts` (state machine) · `use-otp-inputs.ts` (N-box field: change/backspace/paste/autofocus) · `use-resend-timer.ts` (countdown) |

### Components

`AuthSplit` (RSC) → `AuthBrandPanel` (RSC, dark, `auth-brand-panel.module.css` for the
spin/blob/float decoration) + right column.
`PhoneAuthFlow` (client) owns `usePhoneAuth`, renders `AuthProgress` + one of
`PhoneStep` / `OtpStep` / `ProfileStep` / `DoneStep`. Shared leaves: `StepHeading`,
`AuthField`, `AuthSubmit`, `AuthError`, `OtpInputs`, `ResendControl`.
State flow: `usePhoneAuth` holds step/phone/errors/`failures`/`isNewUser` and composes
`useResendTimer`; `OtpStep` owns `useOtpInputs` and reacts to `failures` (reset + shake).

### Shared / cross-cutting

- `BrandLogo` promoted `features/marketing/components/` → **`components/molecules/`**
  (domain-agnostic); marketing header/footer + auth panel import it from the barrel.
- `icon-paths.ui.tsx` += `arrowStart`, `alert`, `lock`, `userPlus`, `wallet`.
- `constants/regex.ts` += `phoneIR`, `otp5`.
- `styles/animations.css` += `auth-fade-up`, `auth-shake`, `auth-pulse`, `auth-pop`.

---

## 2026-09-04 — Product detail page (`/products/[slug]`) — SSG, JSON-LD, 3D viewer

### Route

- **`app/(public)/products/[slug]/page.tsx`** — `generateStaticParams` from `PRODUCTS`
  (`●` SSG, all 9 slugs prerendered). `generateMetadata` per product (title `نام | برند`,
  canonical `/products/<slug>`; `noindex` on unknown slug). `notFound()` for missing slug.
  Emits `breadcrumbSchema` (3 crumbs) + new **`productSchema`** (`Product` + `Offer` IRR +
  `AggregateRating`) as one JSON-LD script. Page JS 253 B / 145 kB First Load —
  **`three` is NOT in the bundle** (loaded on demand, see below).
- `routes.product(slug)` added; `sitemap.ts` now appends every product URL (imports
  `PRODUCTS` from `data/catalog` directly).
- `ProductCard` title + media now link to `routes.product(id)` (catalog + related nav).
- `cart-store.addItem(item, quantity?)` — accepts a quantity for the buy-box stepper.

### Detail data (mock, `features/marketing/`)

| File | Role |
| --- | --- |
| `types/product-detail.ts` | `ProductDetail` (gallery, keySpecs, colors, models, highlights, specs, reviews, ratingBars, faqs) + `SpecRow` · `Faq` · `ProductReview` · `RatingBar` · `ColorOption` |
| `data/product-details.ts` | `SPEC_TEMPLATES` / `HIGHLIGHTS` by `ProductGroup`, `COLOR_OPTIONS`, `MODELS_BY_CATEGORY`, `REVIEW_POOL`, `PRODUCT_FAQS`, gallery labels |
| `utils/product-detail.ts` | `getProductDetail(product)` · `ratingBars(rating)` (rating-weighted histogram) · `findProduct(slug)` · `relatedProducts(product, limit)` (same category first) |

### Components (`components/product-detail/`)

`ProductDetailView` (RSC) composes: `ProductBreadcrumb` → hero grid
[`ProductGallery` (client) · `ProductBuyBox` (client)] → `DetailTabs` (client, sticky,
IntersectionObserver-driven active state) → `DetailSection` ×4 wrapping `ProductDescription`
(+ `HighlightList`), `SpecTable`, `ProductReviews` (`ReviewSummary` + `RatingBar` +
`ReviewCard`), `ProductFaq` (native `<details>`, JS-free) → `RelatedProducts` (reuses
`ProductCard`). Buy-box atoms: `BuyBoxPrice` · `KeySpecChips` · `ColorSwatches` ·
`ModelPicker` · `QuantityStepper` · `StarRow`. The old cream guarantee strip was dropped —
`StoreFooter`'s trust bar already covers it site-wide.

### 3D viewer (`three` + `@react-three/fiber` v9 + `@react-three/drei` v10)

`ProductGallery` toggles `photo` ⇄ `stage`. `ProductStage` → `StageBoundary` (class error
boundary → graceful "پشتیبانی نمی‌شود" fallback if WebGL fails) → `next/dynamic(StageScene,
{ ssr: false })`. `StageScene` = an r3f `<Canvas>` with plain lights (no remote HDR),
`OrbitControls` (auto-rotate) and a **procedural stand-in impact wrench** (swap for a real
GLB later). Because it is `dynamic`+`ssr:false`, the `three` chunk is fetched only when the
viewer opens — First Load JS is unchanged.

### Deps / config

`three`, `@react-three/fiber`, `@react-three/drei` added; `@types/three` dev. R3F v9 augments
`declare module 'react' { JSX.IntrinsicElements }`, which turned `<Tag …>` (dynamic
`ElementType`) into `never` props — fixed by switching `Container` and `Reveal` to
`React.createElement`. `icon-paths.tsx` split into `icon-paths.tools.tsx` +
`icon-paths.ui.tsx` (150-line cap). `next.config` `optimizePackageImports` += `@react-three/drei`.

---

## 2026-09-04 — Catalog page (`/products`) — faceted, URL-synced, RSC shell

### Route

- **`app/(public)/products/page.tsx`** — `ƒ` dynamic (reads `searchParams`). `generateMetadata`
  parses params → `noindex` when any filter is active (`hasActiveFilters`), canonical always
  clean `/products`. Emits `breadcrumbSchema` + `itemListSchema(PRODUCTS)` as one JSON-LD
  script. Renders `<CatalogHero>` (RSC breadcrumb + h1 + SEO copy) → `<PromoTicker>` (reused)
  → `<ProductCatalog>` (client island). Page JS 227 B / 141 kB First Load (== home).
- `routes.products = '/products'` added; `PUBLIC_PATHS` + `sitemap.ts` (priority 0.9) updated.
- `PRIMARY_NAV` "پرفروش‌ها" → **"همه محصولات" → `routes.products`**; footer category links now
  deep-link `?category=<slug>`.

### Data / logic (`features/marketing/`)

| File | Role |
| --- | --- |
| `types/catalog.ts` | `CatalogFilters` · `SortKey` · `CatalogView` · `FilterChip` + option consts (`SORT_/DISCOUNT_/RATING_/USAGE_OPTIONS`, `CATALOG_MAX_PRICE`) |
| `utils/catalog-params.ts` | Zod `catalogParamsSchema` (csv category/brand, coerced numerics, enum guards) · `toCatalogState` · `toCatalogSearch` · `hasActiveFilters` · `DEFAULT_FILTERS` |
| `utils/catalog-filter.ts` | pure `applyCatalogFilters(products, filters, sort)` · `categoryCounts` · `catalogBrands` |
| `utils/catalog-chips.ts` | `buildFilterChips(filters, patch, categoryTitle)` → removable pills |
| `hooks/use-catalog-filters.ts` | `'use client'` — owns filters/sort/view, mirrors to URL via `window.history.replaceState` (no RSC round-trip); exposes `toggleCategory/Brand`, `setMaxPrice/MinDiscount/MinRating/Usage`, `toggleInStock`, `reset`, `patch` |

### Components (`components/catalog/`)

`product-catalog.tsx` (client top-level) composes: `MobileFilterDisclosure` (collapses the
panel `<lg`, sticky column `lg`) → `CatalogSidebar` → `CatalogToolbar`
(`SortMenu` client dropdown + `ViewToggle`) → `ActiveFilterChips` → `CatalogResults`
(grid `ProductCard` / list `ProductListRow`) → `LoadMoreButton` (`PAGE_SIZE = 6`) or
`CatalogEmpty`. Sidebar atoms: `FilterSection` · `FilterCheckbox` · `FilterRadioGroup` ·
`PriceRangeFilter` · `UsageToggle`.

### Product card — out-of-stock

`product-card.tsx` split: new `ProductMedia` (grayscale + "ناموجود" overlay when
`!inStock`), new `NotifyButton` (client, replaces `AddToCartButton` when out of stock).
New `ProductListRow` reuses badge/media/price/rating for list view. 7 icons added
(`chevronDown`, `close`, `bell`, `sliders`, `sort`, `grid`, `list`).

### State flow

`searchParams` → server `toCatalogState` → `initial` prop → `useCatalogFilters` seeds
client state → user edits mutate state → `useEffect` serializes back to the URL. Results are
`useMemo(applyCatalogFilters)`; `visibleCount` (load-more) resets to `PAGE_SIZE` on any
filter/sort change. `PRODUCTS` re-exported via `data/catalog.ts` from `data/products.ts`
(9 items, extended `Product`: `categorySlug`, `group`, `brand`, `usage`, `inStock`,
`description`).

---

## 2026-09-04 — Storefront home page (`پوما ایر`) + RTL/Persian foundation

### Foundation

- **Locale/RTL:** root `layout.tsx` → `lang="fa" dir="rtl"`; `Vazirmatn` (arabic+latin)
  as `--font-vazirmatn`/body, `Space_Grotesk` as `--font-space-grotesk` → `--font-display`
  (numerals, eyebrows). `NEXT_PUBLIC_SITE_NAME` = `پوما ایر` in `.env.local`/`.env.example`.
- **Design tokens** (`styles/globals.css` `@theme`): rust brand ramp (`--color-brand-*`),
  `--color-accent-*` (gold), `--color-ink`, `--color-sale`, `--color-info`, warm surface
  ramp (`surface` / `surface-muted` = body / `surface-sunken`), `--color-hairline`,
  `--radius-card: 1.375rem`. **Storefront is committed light** — dark blocks removed,
  `color-scheme: light`; dark theming reserved for the dashboard.
- **Animations** (`styles/animations.css`): `marquee-forward` / `marquee-reverse` keyframes;
  `.reveal` = one-shot on-load `reveal-in` entrance (never scroll- or JS-gated, always
  settles visible; reduced-motion reset collapses it).
- `config/site.ts` rewritten (Persian copy, phone/email/address, `links` = instagram/
  telegram/whatsapp). `lib/json-ld.ts` gained `websiteSchema` (SearchAction),
  `localBusinessSchema` (`HardwareStore`), `itemListSchema`. `robots.ts` disallows `/search`.
- `config/routes.ts` + `search`, `account`. New stub route `(public)/search` (SSR,
  Zod-parsed `?q`, `noindex`).

### Shared primitives (`components/`)

| Atom | Purpose |
| --- | --- |
| `atoms/icons/{icon-paths.tsx,icon.tsx}` | 1em stroked `<Icon name>` registry (~28 icons), no `dangerouslySetInnerHTML` |
| `atoms/media-placeholder.tsx` (+`.module.css`) | zero-CLS striped stand-in for `next/image` |
| `atoms/count-up.tsx` | `'use client'` — SSR-renders the real figure, rewinds + sweeps on view |
| `atoms/container.tsx` | page-width wrapper (`max-w-[1400px]` + responsive gutter) |
| `atoms/pill-link.tsx` | `next/link` styled as a pill button (primary/outline/ghost) |
| `molecules/marquee/` | `<Marquee reverse speed>` — content rendered twice, copy `aria-hidden` |
| `molecules/reveal.tsx` | RSC `.reveal` wrapper (CSS-only entrance) |
| `molecules/section-heading.tsx` | eyebrow + `h2` + optional trailing `action` |

Old `components/organisms/site-header.tsx` + `site-footer.tsx` **deleted**
(`organisms/index.ts` now only exports `DashboardSidebar`).

### Feature: `features/marketing/` (storefront)

```
features/marketing/
├── anchors.ts                 SECTION ids + anchor()
├── data/{navigation,categories,catalog,content}.ts   mock content (Persian)
├── types/index.ts             Category · Product · Deal · PromoCard · ValueProp · …
├── utils/persian.ts           toPersianDigits · formatToman · discountPercent
├── hooks/use-cart-quantity.ts hydration-safe cart count
├── services/newsletter.actions.ts   'use server' — Zod-validated opt-in (ActionResult)
├── components/
│   ├── store-header.tsx  ← announcement-bar · brand-logo · header-search (GET /search)
│   │                        · header-actions · cart-button (client) · primary-nav
│   ├── hero/             hero · hero-badge · hero-headline (client, rotating word)
│   │                     · hero-stats (CountUp) · hero-showcase · hero-floating-card
│   ├── category-rail/    category-rail · category-rail-item (data-driven chip colour)
│   ├── flash-deals/      flash-deals · deals-countdown (client) · deal-card
│   ├── promo-cards/      promo-cards · promo-card
│   ├── products/         product-showcase (client, tab state) · product-tabs (client)
│   │                     · product-card · product-badge · product-price · rating-stars
│   │                     · wishlist-button (client) · add-to-cart-button (client)
│   ├── promo-ticker.tsx · value-props/ · about/ · testimonials/ (client) · brand-strip.tsx
│   ├── newsletter-cta.tsx (client, useActionState + .module.css)
│   └── journal/ · footer/ (store-footer · trust-bar · social-links · nav-column · contact)
└── index.ts               barrel — components + `PRODUCTS`; never re-exports `*.actions.ts`
```

### State flow

- **Cart:** `store/cart-store.ts` (new, persisted `pumaair-cart`) — `addItem` /
  `selectCartQuantity`. `AddToCartButton` writes; `CartButton` reads via
  `useCartQuantity` (0 until hydrated → no badge mismatch).
- **Tabs:** `ProductShowcase` owns `tab` state, filters `PRODUCTS` by `group`, feeds
  `ProductTabs` (controlled) + grid.
- **Testimonials / hero word:** local `useState` + `setInterval` (paused under
  reduced-motion). **Countdown:** deadline set on client mount, ticks 1 s.
- **Newsletter:** `useActionState(subscribeToNewsletter)` → server Zod validation →
  `ActionResult`; success swaps the form for a confirmation.

### Routing / SEO

- `(public)/layout.tsx` → skip-link + `StoreHeader` / `StoreFooter` from the feature.
- `(public)/page.tsx` — static; all 12 sections composed; injects `websiteSchema` +
  `localBusinessSchema` + `itemListSchema(PRODUCTS)` as one JSON-LD script; metadata via
  `buildMetadata`. Every section is `aria-labelledby` a real heading; `scroll-mt-24`
  for anchor offset. First Load JS ≈ 123 kB (page 220 B — RSC-first, ~8 small client leaves).

---

## 2026-09-03 — Operating mandate codified in CLAUDE.md

Folded the full enterprise mandate (directory law, Tailwind v4 + CSS Modules hybrid,
150-line cap, `any` ban, RSC-first, cloud.md protocol, SEO/CWV rules, OWASP/RBAC/CSRF/XSS
standards) into `CLAUDE.md` as the binding contract. Added gap-fills: API-route Zod
validation rule, `searchParams` validation, `next/image` + `next/font` mandate, CSP as a
pre-launch TODO, `dangerouslySetInnerHTML` policy (JSON-LD only), providers roadmap
(Toast + Session), and a quick-reference table. Updated stale `pnpm lint` description
(now `eslint --max-warnings 0`, not `next lint`).

---

## 2026-09-03 — Foundation scaffold

### Stack

| Concern            | Choice                                                        |
| ------------------ | ------------------------------------------------------------ |
| Framework          | Next.js 15 (App Router, RSC-first)                          |
| Language           | TypeScript 5.7 (`strict`, `noUncheckedIndexedAccess`)       |
| Styling            | Tailwind CSS v4 (CSS-first `@theme`) + CSS Modules hybrid   |
| Data fetching (client) | TanStack Query v5                                       |
| Global state       | Zustand v5 (persisted)                                      |
| Validation         | Zod (env, inputs, API responses, JWT payload)               |
| Backend            | **External** — `abzar/api` (this app is frontend + BFF only) |
| Auth               | API-issued JWT in HttpOnly `abzar_session` cookie           |

### Directory contract

```
src/
  app/(public)      RSC marketing site + auth pages
  app/(dashboard)   Server-gated portal shell
  app/api           BFF route handlers (health, auth/me)
  components/{atoms,molecules,organisms}
  features/<domain>/{components,hooks,services,types,utils}
  config            env (zod), routes, site
  constants         enums, regex
  lib               api-client, jwt, session, rbac, seo, json-ld, utils
  providers         AppProviders → QueryProvider → ThemeProvider
  store             ui-store (theme, sidebar)
  styles            globals.css, animations.css
  types             LayoutProps, PageProps, ActionResult
```

### Routes

| Path                          | Group       | Rendering | Guard                         |
| ----------------------------- | ----------- | --------- | ----------------------------- |
| `/`                           | (public)    | RSC       | —                             |
| `/about`                      | (public)    | RSC       | — (+ Breadcrumb JSON-LD)      |
| `/login`, `/register`         | (public)    | RSC+form  | redirect to `/dashboard` if session |
| `/dashboard`                  | (dashboard) | RSC       | middleware + layout `getSession` |
| `/dashboard/analytics`        | (dashboard) | RSC       | as above                      |
| `/dashboard/admin/users`      | (dashboard) | RSC       | middleware + page `isAdmin`   |
| `/api/health`                 | api         | dynamic   | —                             |
| `/api/auth/me`                | api         | dynamic   | session cookie → `abzar/api`  |
| `/sitemap.xml`, `/robots.txt` | app         | static    | —                             |

### Features

- **auth** — `loginSchema`/`registerSchema`/`authTokensSchema` (types),
  `authApi` (server-only api wrappers), `loginAction`/`registerAction`/`logoutAction`
  (server actions, set/clear cookie), `LoginForm`/`RegisterForm`/`LogoutButton`,
  `useCurrentUser` (client, hits `/api/auth/me`), `formatRole`.
- **marketing** — `Hero`, `FeatureGrid` (pure RSC sections for `/`).
- **dashboard-shell** — `DashboardTopbar` (RSC) + `SidebarToggle` (client leaf).

### State flows

- **Session**: `abzar/api` issues JWT → `setSessionCookie` (HttpOnly, SameSite=Lax,
  Secure in prod) → `middleware` decodes for routing (edge, `lib/jwt`) → server
  components read via `getSession` (`lib/session`) → client reads via `useCurrentUser`.
- **Theme**: `ui-store.theme` (persisted) → `ThemeProvider` sets `<html data-theme>`.
- **Sidebar**: `ui-store.sidebarOpen` (persisted) ↔ `SidebarToggle` / `DashboardSidebar`.

### Components

| Layer     | Components                                            |
| --------- | ---------------------------------------------------- |
| atoms     | Button, Input, Badge, Heading/Text, Spinner         |
| molecules | FormField, Card/CardHeader/CardTitle                 |
| organisms | SiteHeader, SiteFooter, DashboardSidebar             |
