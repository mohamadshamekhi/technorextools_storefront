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

`catalog` (categories, brands, products, `products/:id/comments`, bundles) ·
`cart` (items CRUD, `cart/bundles`) · `checkout` (`quote` → `checkout` → `checkout/:id/pay`) ·
`orders` · `addresses` · `wishlist` · `discounts/validate` · `loyalty` (+ `referrals`) ·
`tickets` (+ `messages`) · `repairs` · `warranty/verify?serial=` · `shipping/methods` ·
`content` (`articles`, `branches`, `seo`, `settings/public`)

## `/backoffice/*` — admin portal only (RBAC-gated)

`access` (permissions, roles CRUD) · `users` · `categories` + `attribute-groups` + `attributes` ·
`brands` · `products` + `variants` + `attribute-values` + `related` · `inventory/variants` +
`price-tiers` · `orders` (+ `status`) · `payments` · `shipping-methods` · `discounts` (+ `usages`) ·
`comments` · `tickets` (+ `messages`, `status`) · `warranties` · `repairs` (+ `status`) ·
`content` (`articles`, `branches`, `seo`) · `settings` · `bundles` · `loyalty` (+ `adjust`) ·
`reports` (`sales`, `inventory`, `admin-logs`) · `media` (`upload`, CRUD)
