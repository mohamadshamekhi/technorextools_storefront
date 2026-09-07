/**
 * Central route registry. Never hardcode a path string in a component —
 * import from here so refactors are a single-file change.
 */
export const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  products: '/products',
  product: (slug: string) => `/products/${slug}`,
  category: (slug: string) => `/categories/${slug}`,
  search: '/search',
  cart: '/cart',
  checkout: '/checkout',
  account: '/dashboard',
  blog: '/blog',
  blogPost: (slug: string) => `/blog/${slug}`,

  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },

  dashboard: {
    root: '/dashboard',
    orders: '/dashboard/orders',
    addresses: '/dashboard/addresses',
    profile: '/dashboard/account',
    wishlist: '/dashboard/wishlist',
    notifications: '/dashboard/notifications',
    analytics: '/dashboard/analytics',
    billing: '/dashboard/billing',
    settings: '/dashboard/settings',
  },

  admin: {
    root: '/dashboard/admin',
    users: '/dashboard/admin/users',
  },
} as const;

/** Route groups used by the RBAC middleware. */
export const PUBLIC_PATHS = [
  '/',
  '/about',
  '/contact',
  '/products',
  '/categories',
  '/blog',
  '/cart',
  '/checkout',
] as const;
export const AUTH_PATHS = ['/login', '/register', '/forgot-password'] as const;
export const DASHBOARD_PREFIX = '/dashboard';
export const ADMIN_PREFIX = '/dashboard/admin';
