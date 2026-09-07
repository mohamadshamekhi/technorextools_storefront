'use client';

import { useState } from 'react';

import { findDemoOrder } from '../data/orders';
import { trackingFormSchema, type TrackedOrder } from '../types';

type TrackingState = {
  order: TrackedOrder | null;
  error: string | null;
};

/** Owns the lookup form → fixture query → result state for the tracking page. */
export function useOrderTracking() {
  const [state, setState] = useState<TrackingState>({ order: null, error: null });

  const submit = (raw: { code: string; mobile: string }) => {
    const parsed = trackingFormSchema.safeParse(raw);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'ورودی نامعتبر است';
      setState({ order: null, error: message });
      return;
    }

    const order = findDemoOrder(parsed.data.code, parsed.data.mobile);
    setState(
      order
        ? { order, error: null }
        : {
            order: null,
            error: 'سفارشی با این مشخصات پیدا نشد. کد سفارش و شماره موبایل را بررسی کنید.',
          },
    );
  };

  return { order: state.order, error: state.error, submit };
}
