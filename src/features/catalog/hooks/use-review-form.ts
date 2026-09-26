'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';

import { createCommentSchema } from '../services/comments.schemas';

type FieldErrors = Partial<Record<'rating' | 'body' | 'form', string>>;

/**
 * Owns the review draft for one product. Posts to the BFF; a 401 throws
 * `UnauthorizedError` so `QueryProvider` opens the sign-in modal in place.
 */
export function useReviewForm(slug: string) {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (input: { rating: number; body: string }) => {
      const res = await fetch(`/api/catalog/products/${encodeURIComponent(slug)}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? 'ثبت دیدگاه ناموفق بود. دوباره تلاش کنید.');
      }
    },
    onSuccess: () => {
      setSubmitted(true);
      setRating(0);
      setBody('');
    },
    onError: (error) => {
      if (error instanceof UnauthorizedError) return;
      setErrors({ form: error.message });
    },
  });

  const submit = () => {
    const parsed = createCommentSchema.safeParse({ rating, body });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({ rating: flat.rating?.[0], body: flat.body?.[0] });
      return;
    }
    setErrors({});
    mutation.mutate(parsed.data);
  };

  return {
    rating,
    setRating,
    body,
    setBody,
    errors,
    submitted,
    pending: mutation.isPending,
    submit,
  };
}
