'use client';

import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { UnauthorizedError } from '@/lib/api-error';

import { createQuestionSchema } from '../services/pdp.schemas';

type FieldErrors = Partial<Record<'question' | 'form', string>>;

/**
 * Owns the "ask a question" draft for one product. Posts to the BFF; a 401 throws
 * `UnauthorizedError` so `QueryProvider` opens the sign-in modal in place.
 */
export function useQuestionForm(slug: string) {
  const [question, setQuestion] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (input: { question: string }) => {
      const res = await fetch(`/api/catalog/products/${encodeURIComponent(slug)}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (res.status === 401) throw new UnauthorizedError();
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? 'ثبت پرسش ناموفق بود. دوباره تلاش کنید.');
      }
    },
    onSuccess: () => {
      setSubmitted(true);
      setQuestion('');
    },
    onError: (error) => {
      if (error instanceof UnauthorizedError) return;
      setErrors({ form: error.message });
    },
  });

  const submit = () => {
    const parsed = createQuestionSchema.safeParse({ question });
    if (!parsed.success) {
      setErrors({ question: parsed.error.flatten().fieldErrors.question?.[0] });
      return;
    }
    setErrors({});
    mutation.mutate(parsed.data);
  };

  return {
    question,
    setQuestion,
    errors,
    submitted,
    pending: mutation.isPending,
    submit,
  };
}
