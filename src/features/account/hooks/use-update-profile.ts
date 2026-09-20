'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';
import { authUserSchema, type AuthUser } from '@/features/auth/types';

export type UpdateProfileInput = { fullName?: string; email?: string | null };

/** Extracts a Persian-friendly message from a failed BFF response. */
async function readErrorMessage(res: Response, fallback: string) {
  const payload: unknown = await res.json().catch(() => null);
  return (payload as { message?: string; error?: string } | null)?.message ?? fallback;
}

/** Saves name/email via `/api/auth/me` and syncs the cached current-user. */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<AuthUser, Error, UpdateProfileInput>({
    mutationFn: async (input) => {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error(await readErrorMessage(res, 'ثبت اطلاعات ناموفق بود'));
      return authUserSchema.parse(await res.json());
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['auth', 'me'], user);
    },
  });
}
