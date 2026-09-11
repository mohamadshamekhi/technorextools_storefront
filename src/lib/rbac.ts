import { ROLE_RANK, UserRole } from '@/constants';

/** True when `role` meets or exceeds the required role in the hierarchy. */
export function hasRole(role: string | undefined, required: UserRole): boolean {
  if (!role) return false;
  return (ROLE_RANK[role] ?? 0) >= (ROLE_RANK[required] ?? 0);
}

export function isAdmin(role: string | undefined): boolean {
  return hasRole(role, UserRole.SuperAdmin);
}
