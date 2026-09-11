'use client';

import { useMutation } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';

/** Re-opens a payment session for a pending `online` order, then redirects there. */
export function useRetryPayment(orderNumber: string) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/checkout/${encodeURIComponent(orderNumber)}/pay`, {
        method: 'POST',
        credentials: 'same-origin',
      });
      if (res.status === 401) throw new UnauthorizedError();
      const payload: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          (payload as { message?: string } | null)?.message ?? 'باز کردن درگاه پرداخت ناموفق بود',
        );
      }
      return payload as { paymentUrl: string };
    },
    onSuccess: (result) => {
      window.location.assign(result.paymentUrl);
    },
  });
}
