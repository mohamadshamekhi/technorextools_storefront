'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type { RepairDecisionValues } from '@/features/repairs';
import { UnauthorizedError } from '@/lib/api-error';

/** Sends the customer's approve/reject answer for a repair estimate, then refreshes the RSC
 * detail page so status/timeline come back from `abzar/api` rather than local state. */
export function useRepairDecision(repairId: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: RepairDecisionValues) => {
      const res = await fetch(`/api/account/repairs/${encodeURIComponent(repairId)}/decision`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) {
        const payload: unknown = await res.json().catch(() => null);
        const message = (payload as { message?: string } | null)?.message;
        throw new Error(message ?? 'ثبت پاسخ ناموفق بود. دوباره تلاش کنید.');
      }
    },
    onSuccess: () => {
      router.refresh();
    },
  });
}
