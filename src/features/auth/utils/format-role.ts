import { UserRole } from '@/constants';

const LABELS: Record<UserRole, string> = {
  [UserRole.User]: 'Member',
  [UserRole.Admin]: 'Administrator',
  [UserRole.SuperAdmin]: 'Super Admin',
};

/** Human-readable label for a role enum value. */
export function formatRole(role: UserRole): string {
  return LABELS[role] ?? 'Unknown';
}
