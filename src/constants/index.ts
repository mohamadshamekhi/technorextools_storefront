/** App-wide enums. Kept framework-agnostic and dependency-free. */

/**
 * Known role slugs from `abzar/api`'s DB-driven role table (`access` module — roles are
 * CRUD'd there, not a fixed enum; permissions are resolved per-request, never carried in
 * the token). Only these two are guaranteed constants on the API side today
 * (`CUSTOMER_ROLE_SLUG`, `SUPERADMIN_ROLE_SLUG`); any other slug is a custom backoffice
 * role this storefront doesn't know the rank of.
 */
export enum UserRole {
  Customer = 'customer',
  SuperAdmin = 'superadmin',
}

export enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

/** Unknown role slugs (any custom backoffice role) rank as `undefined` → treated as 0. */
export const ROLE_RANK: Partial<Record<string, number>> = {
  [UserRole.Customer]: 1,
  [UserRole.SuperAdmin]: 3,
};

export const QUERY_STALE_TIME = 60 * 1000; // 1 minute
export const DEFAULT_PAGE_SIZE = 20;
