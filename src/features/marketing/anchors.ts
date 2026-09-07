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

export const anchor = (id: keyof typeof SECTION) => `#${SECTION[id]}`;
