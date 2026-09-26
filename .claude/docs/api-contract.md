# `abzar/api` contract

**Source of truth:** Postman export at `../api/postman/abzar-api.postman_collection.json`
(+ `abzar-api.postman_environment.json` for var names / sample values). Read the collection
before writing any `apiClient` call, BFF route, or Zod response schema — match its exact
paths, methods, query params, and payload shapes. When the collection and this file
disagree, the collection wins — update this summary.

- **Base:** `{apiBase}` = `http://localhost:4000/api/v1` (dev). Paths below are relative to it.
- **Auth:** `POST /auth/otp/request` → `POST /auth/otp/verify` (returns access + refresh) →
  `POST /auth/refresh`; `GET /auth/me`, `PATCH /auth/me`, `POST /auth/logout`. Bearer access token.
- List endpoints paginate with `skip` / `take`.

## `/storefront/*` — public site + customer dashboard

`catalog` (categories, brands, products, `products/:id/comments`,
`products/:slug/questions` (GET public, POST auth → `{status:"pending"}`, moderated), bundles) —
product detail also carries `documents[]`, `highlights[]` (`icon` is a free-form key, mapped
client-side), `model3dHotspots[]` (model-space `[x,y,z]`, unlike `parts[].hotspot` which is
image percent) and `questions[]` (approved only) ·
`cart` (items CRUD, `cart/bundles`) · `checkout` (`quote` → `checkout` → `checkout/:id/pay`;
`checkout/in-flight` → `{locked, order|null}`; `POST /checkout` `409` carries
`details.code` = `checkout_in_progress` (own request running, `orderNumber` may be null) or
`pending_order_exists` (unpaid order holds the cart, `orderNumber` always set)) ·
`media/upload` (multipart `file` + optional `alt`, JPEG/PNG/WebP/PDF ≤ 10MB → `MediaView.id`) ·
`orders` (items carry `imageUrl|null`, `productSlug|null`, `kind ∈ variant|bundle|spare_part` — live from the catalog; `productTitle`/`sku` stay purchase-time snapshots; bundles always `imageUrl: null`) (+ `orders/track`: guest `POST {code, mobile}`, no auth, 10/min; any mismatch → `404`,
never "wrong mobile"; returns the order detail + `statusLabel`, `carrier`, `trackingNumber`,
`timeline[{key,label,date|null}]`) · `contact` (`POST {name, phone, subject?, message}` → `201
{id}`, 5/min) · `newsletter` (`POST {contact}` → `{created}`; `201` new, `200` already
subscribed — both success) · `addresses` · `wishlist` · `notifications` (+ `:id/read`, `read-all`; row = `{id, type, title, body, link, createdAt, read}`,
`type` = `order_shipped|order_delivered|order_cancelled|repair_status|discount|system`, `link` is
an internal app path or `null`) ·
`discounts/validate` · `loyalty` (+ `referrals`) ·
`tickets` (+ `messages`) · `repairs` (list + `:id` + `:id/decision` — `POST {decision: approve|reject, note?: string|null ≤500}`, JWT + owner-scoped, 10/min; `approve` → `in_progress`, `reject` → `canceled`; `200` = updated repair view; `404` «درخواست تعمیر یافت نشد» (owner mismatch is 404 on purpose, never 403); `409` when not `awaiting_customer`, `estimatedCost === null`, or the admin changed status meanwhile — render the upstream Persian `message` as-is; compare-and-set upstream, so a double click is a harmless `409`) — `status` ∈ `received | reviewing |
awaiting_customer | awaiting_parts | in_progress | done | delivered | canceled`, always paired
with a Persian `statusLabel` (render that, never a local map); views carry `statusHistory[{status,
statusLabel, at, note|null, by: admin|customer|system}]` (oldest first, never empty; `by` is
additive — old rows read as `admin`), `technicianNote` and `estimatedCost`
(toman, `null` until quoted); attachments are `mediaIds[]` (≤ 5, from `media/upload`);
`attachmentUrl` is gone. Responses carry `attachments: [{id, url, contentType, originalName}]`
and each ticket message has an `id`. · `warranty/verify?serial=` · `shipping/methods` ·
`catalog/bundles` (+ `/:slug`) — پکیج: `{id, title, slug, description|null, bundlePrice, imageUrl|null, compareAtTotal, savingAmount, available, packagesInStock, items:[{qty, variant:{id, sku, colorName, stockQty, isActive, effectivePrice, imageUrl, product:{id,title,slug,isActive}}}]}`؛ `bundlePrice` قیمت کل سبد است، صرفه‌جویی از جمع `effectivePrice` اعضا حساب می‌شود · `cart/bundles` (`POST {bundleId, qty}`) ·
`content` (`articles`, `branches`, `seo`, `settings/public`)

**Error envelope:** `{statusCode, error, message, fieldErrors?, details?, path, timestamp}` —
`details` is endpoint-specific (see checkout `409` above).

## `/backoffice/*` — admin portal only (RBAC-gated)

`access` (permissions, roles CRUD) · `users` · `categories` + `attribute-groups` + `attributes` ·
`brands` · `products` + `variants` + `attribute-values` + `related` · `inventory/variants` +
`price-tiers` · `orders` (+ `status`) · `payments` · `shipping-methods` · `discounts` (+ `usages`) ·
`comments` · `tickets` (+ `messages`, `status`) · `warranties` · `repairs` (+ `status` — body takes optional `note` ≤ 500 chars; `PATCH :id` sets
`technicianNote` / `estimatedCost` without touching status or notifying) ·
`content` (`articles`, `branches`, `seo`) · `settings` · `bundles` · `loyalty` (+ `adjust`) ·
`reports` (`sales`, `inventory`, `admin-logs`) · `media` (`upload`, CRUD)
