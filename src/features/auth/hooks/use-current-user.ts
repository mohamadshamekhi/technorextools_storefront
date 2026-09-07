'use client';

import { useQuery } from '@tanstack/react-query';

import { authUserSchema, type AuthUser } from '@/features/auth/types';

/** Reads the session-bound user from the BFF route (`/api/auth/me`). */
export function useCurrentUser() {
  return useQuery<AuthUser | null>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error('Failed to load user');
      return authUserSchema.nullable().parse(await res.json().catch(() => null));
    },
    staleTime: 5 * 60 * 1000,
  });
}
