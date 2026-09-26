'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import type { TrackedOrder } from '../services/order-tracking.schemas';
import { trackingFormSchema, type TrackingFormValues } from '../types';

/** Owns the lookup form → BFF call → result state for the tracking page. */
export function useOrderTracking() {
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (input: TrackingFormValues): Promise<TrackedOrder> => {
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const payload = (await res.json().catch(() => null)) as
        (TrackedOrder & { error?: string }) | null;
      if (!res.ok) throw new Error(payload?.error ?? 'پیگیری سفارش ناموفق بود.');
      if (!payload) throw new Error('پاسخ نامعتبر از سرور.');
      return payload;
    },
    onSuccess: () => setError(null),
    onError: (err: Error) => setError(err.message),
  });

  const submit = (raw: { code: string; mobile: string }) => {
    const parsed = trackingFormSchema.safeParse(raw);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'ورودی نامعتبر است');
      mutation.reset();
      return;
    }
    setError(null);
    mutation.mutate(parsed.data);
  };

  return { order: mutation.data ?? null, error, pending: mutation.isPending, submit };
}
