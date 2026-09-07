'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

/** Out-of-stock replacement for the add-to-cart action. */
export function NotifyButton({ title }: { title: string }) {
  const [asked, setAsked] = useState(false);

  return (
    <button
      type="button"
      aria-label={`اطلاع از موجود شدن ${title}`}
      onClick={() => setAsked(true)}
      className={cn(
        'border-hairline text-foreground-muted hover:border-brand-500 hover:text-brand-600 mt-auto flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition-colors',
        asked && 'border-brand-500 text-brand-600',
      )}
    >
      <Icon name={asked ? 'check' : 'bell'} className="size-4" />
      {asked ? 'به شما اطلاع می‌دهیم' : 'اطلاع از موجود شدن'}
    </button>
  );
}
