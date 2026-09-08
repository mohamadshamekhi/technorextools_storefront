# Product photography

Real product shots served as static assets.

## Required now

- **`puma-air-screwdriver.png`** — the yellow Puma Air pneumatic screwdriver on a
  transparent / white background. Used as the shared hero + card shot across the
  storefront (see `src/features/marketing/data/media.ts` → `PRODUCT_SHOT`).

  Recommended: square-ish, ≥ 1000×1000, transparent PNG (or clean white). The
  components render it with `object-contain`, so extra whitespace is fine.

When per-product art is available, add files here and map them by product id in
`media.ts`.
