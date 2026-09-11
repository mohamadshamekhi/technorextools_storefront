# Styling — Tailwind v4 + CSS Modules hybrid

- Tailwind is primary: layout, flex/grid, spacing, tokens, responsive (`sm md lg xl 2xl`,
  mobile-first — unprefixed = smallest).
- **Tokens are CSS-first** in `src/styles/globals.css` `@theme` (Tailwind v4 — no
  `tailwind.config.js`). Colors/radii/fonts there auto-generate utilities. Dark overrides in the
  `@media (prefers-color-scheme: dark)` block.
- **CSS Modules** (`Component.module.css` beside `Component.tsx`) only for complex animations,
  pseudo-elements, custom scrollbars, or unreadable utility chains. Shared keyframes →
  `src/styles/animations.css`.
- **Inline `style={{}}` banned** except genuinely runtime-computed values (progress %, dynamic
  coords, chart geometry). Static style is never an exception.
- Compose conditional classes with `cn()` (`lib/utils.ts`).
