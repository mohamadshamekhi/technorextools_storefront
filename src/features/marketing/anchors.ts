/** In-page section ids. Nav links and `aria-labelledby` both read these. */
export const SECTION = {
  categories: 'categories',
  deals: 'deals',
  products: 'products',
  about: 'about',
  voices: 'voices',
  journal: 'journal',
  contact: 'contact',
} as const;

/**
 * Root-absolute hash link to a homepage section. Prefixing `/` makes the link
 * work from any route (Next navigates home, then scrolls) — a bare `#id` only
 * works while already on `/`.
 */
export const anchor = (id: keyof typeof SECTION) => `/#${SECTION[id]}`;
