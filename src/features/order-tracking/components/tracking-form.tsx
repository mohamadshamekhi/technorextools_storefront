'use client';

import { useState, type FormEvent } from 'react';

import { Button, Icon, Input, Spinner } from '@/components/atoms';

type Props = {
  error: string | null;
  pending: boolean;
  onSubmit: (values: { code: string; mobile: string }) => void;
};

/** Two-field guest lookup form. Validation lives in `useOrderTracking`. */
export function TrackingForm({ error, pending, onSubmit }: Props) {
  const [code, setCode] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ code, mobile });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="کد سفارش"
          aria-label="کد سفارش"
          disabled={pending}
          invalid={Boolean(error)}
        />
        <Input
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          placeholder="شماره موبایل"
          aria-label="شماره موبایل"
          inputMode="numeric"
          disabled={pending}
          invalid={Boolean(error)}
        />
        <Button type="submit" size="lg" disabled={pending} className="shrink-0">
          {pending ? <Spinner className="size-4" /> : null}
          پیگیری
        </Button>
      </div>
      {error ? (
        <p
          role="alert"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-600"
        >
          <Icon name="alert" className="size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </form>
  );
}
