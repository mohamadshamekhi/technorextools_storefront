import { UserRole } from '@/constants';

const LABELS: Partial<Record<string, string>> = {
  [UserRole.Customer]: 'مشتری',
  [UserRole.SuperAdmin]: 'مدیر ارشد',
};

/** Human-readable Persian label for a role slug; an unrecognized slug shows as-is. */
export function formatRole(role: string): string {
  return LABELS[role] ?? role;
}
