/** App-wide enums. Kept framework-agnostic and dependency-free. */

export enum UserRole {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'super_admin',
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

export const ROLE_RANK: Record<UserRole, number> = {
  [UserRole.User]: 1,
  [UserRole.Admin]: 2,
  [UserRole.SuperAdmin]: 3,
};

export const QUERY_STALE_TIME = 60 * 1000; // 1 minute
export const DEFAULT_PAGE_SIZE = 20;
