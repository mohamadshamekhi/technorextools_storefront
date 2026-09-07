'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { SORT_OPTIONS, type SortKey } from '../../types/catalog';

type SortMenuProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export function SortMenu({ value, onChange }: SortMenuProps) {
  const [open, setOpen] = useState(false);
  const active = SORT_OPTIONS.find((option) => option.key === value);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="border-hairline bg-surface flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[13.5px] font-semibold"
      >
        <Icon name="sort" className="text-foreground-muted size-4" />
        {active?.label}
        <Icon name="chevronDown" className="text-foreground-muted size-3" />
      </button>
      {open ? (
        <>
          <button
            type="button"
            aria-label="بستن"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <ul
            role="listbox"
            className="border-hairline bg-surface absolute end-0 top-[calc(100%+8px)] z-20 min-w-44 rounded-2xl border p-2 shadow-xl"
          >
            {SORT_OPTIONS.map((option) => (
              <li key={option.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.key === value}
                  onClick={() => {
                    onChange(option.key);
                    setOpen(false);
                  }}
                  className={cn(
                    'w-full rounded-lg px-3 py-2 text-start text-[13.5px] font-semibold transition-colors',
                    option.key === value
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-foreground-muted hover:bg-surface-sunken',
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
