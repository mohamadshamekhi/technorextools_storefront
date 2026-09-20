'use client';

import { useQuery } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';

import { checkoutInFlightSchema } from '../services/checkout.schemas';

const POLL_MS = 3000;

/**
 * Polls `/api/checkout/in-flight` while `enabled`, stopping as soon as the lock clears —
 * replaces guessing with a timer after a `409`.
 */
export function useCheckoutInFlight(enabled: boolean) {
  return useQuery({
    queryKey: ['checkout', 'in-flight'],
    queryFn: async () => {
      const res = await fetch('/api/checkout/in-flight', { credentials: 'same-origin' });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) throw new Error('بررسی وضعیت سفارش ناموفق بود');
      return checkoutInFlightSchema.parse(await res.json());
    },
    enabled,
    refetchInterval: (query) => (query.state.data?.locked === false ? false : POLL_MS),
    staleTime: 0,
    gcTime: 0,
  });
}
