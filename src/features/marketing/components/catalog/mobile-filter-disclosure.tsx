'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

/** Keeps the filter panel collapsed on phones so results stay above the fold. */
export function MobileFilterDisclosure({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="border-hairline bg-surface mb-3 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold lg:hidden"
      >
        <Icon name="sliders" className="text-brand-600 size-4" />
        {open ? 'بستن فیلترها' : 'نمایش فیلترها'}
      </button>
      <div className={cn('lg:block', !open && 'hidden')}>{children}</div>
    </div>
  );
}
