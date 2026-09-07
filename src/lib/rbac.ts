import { ROLE_RANK, UserRole } from '@/constants';

/** True when `role` meets or exceeds the required role in the hierarchy. */
export function hasRole(role: UserRole | undefined, required: UserRole): boolean {
  if (!role) return false;
  return ROLE_RANK[role] >= ROLE_RANK[required];
}

export function isAdmin(role: UserRole | undefined): boolean {
  return hasRole(role, UserRole.Admin);
}
