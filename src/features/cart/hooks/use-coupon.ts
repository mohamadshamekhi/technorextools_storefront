'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';
import { useCartStore } from '@/store/cart-store';

import type { CouponFeedback } from '../types';
import { toSyncLines } from '../utils/sync-lines';

type DiscountResult = { discountAmount: number };

/** Owns the coupon input + validates it against the real cart via `/api/cart/discount`.
 * The applied code/amount live in `useCartStore`, not local state — so it survives
 * navigating `/cart` → `/checkout` and back instead of resetting. */
export function useCoupon() {
  const applied = useCartStore((state) => state.discountCode) ?? '';
  const discountAmount = useCartStore((state) => state.discountAmount);
  const setDiscount = useCartStore((state) => state.setDiscount);
  const clearDiscount = useCartStore((state) => state.clearDiscount);
  const lines = useCartStore((state) => state.lines);
  const [input, setInput] = useState(applied);
  const [feedback, setFeedback] = useState<CouponFeedback | null>(null);

  const mutation = useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch('/api/cart/discount', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          lines: toSyncLines(lines),
        }),
      });
      if (res.status === 401) throw new UnauthorizedError();
      const payload: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        const message =
          (payload as { message?: string; error?: string } | null)?.message ??
          (payload as { message?: string; error?: string } | null)?.error ??
          'کد تخفیف نامعتبر است';
        throw new Error(message);
      }
      return payload as DiscountResult;
    },
    onSuccess: (result, code) => {
      setDiscount(code, result.discountAmount);
      setFeedback({ text: 'کد تخفیف با موفقیت اعمال شد', valid: true });
    },
    onError: (error) => {
      clearDiscount();
      setFeedback({
        text: error instanceof Error ? error.message : 'کد تخفیف نامعتبر است',
        valid: false,
      });
    },
  });

  const apply = () => {
    const code = input.trim().toUpperCase();
    if (!code) return;
    mutation.mutate(code);
  };

  return { input, setInput, applied, discountAmount, feedback, apply, pending: mutation.isPending };
}
