'use client';

import { useState } from 'react';

import { COUPONS } from '../data/coupons';
import type { CouponFeedback } from '../types';

/** Owns the coupon input + the last apply attempt's applied code / feedback. */
export function useCoupon() {
  const [input, setInput] = useState('');
  const [applied, setApplied] = useState('');
  const [feedback, setFeedback] = useState<CouponFeedback | null>(null);

  const apply = () => {
    const code = input.trim().toUpperCase();
    if (COUPONS[code]) {
      setApplied(code);
      setFeedback({ text: 'کد تخفیف با موفقیت اعمال شد', valid: true });
    } else {
      setApplied('');
      setFeedback({ text: 'کد تخفیف نامعتبر است', valid: false });
    }
  };

  return { input, setInput, applied, feedback, apply };
}
