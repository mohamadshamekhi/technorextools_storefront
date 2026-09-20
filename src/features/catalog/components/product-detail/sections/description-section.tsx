'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

const COLLAPSE_AFTER = 700;

/** Body copy capped at ~72ch with a gradient-faded "read more" for long descriptions. */
export function DescriptionSection({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const collapsible = text.length > COLLAPSE_AFTER;
  const paragraphs = text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return (
    <div className="max-w-[72ch]">
      <div
        className={cn(
          'relative text-[17px] leading-[1.8]',
          collapsible && !open && 'max-h-72 overflow-hidden',
        )}
      >
        {paragraphs.map((chunk, index) => (
          <p key={index} className="text-foreground mb-4 whitespace-pre-line">
            {chunk}
          </p>
        ))}
        {collapsible && !open ? (
          <div
            aria-hidden
            className="to-surface pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent"
          />
        ) : null}
      </div>
      {collapsible ? (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="text-brand-600 hover:text-brand-700 focus-visible:ring-brand-500 mt-1 min-h-11 rounded-lg px-1 text-sm font-bold focus-visible:ring-2 focus-visible:outline-none"
        >
          {open ? 'نمایش کمتر' : 'ادامه توضیحات'}
        </button>
      ) : null}
    </div>
  );
}
