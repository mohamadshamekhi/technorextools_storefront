'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import styles from './description-section.module.css';

const COLLAPSE_AFTER = 900;

/**
 * Product description from `abzar/api`, sanitized server-side by `toDescriptionHtml`
 * before it gets here — the only sanctioned `dangerouslySetInnerHTML` path per `security.md`.
 * Long copy collapses behind a gradient-faded "read more".
 */
export function DescriptionSection({ html }: { html: string }) {
  const [open, setOpen] = useState(false);
  const collapsible = html.length > COLLAPSE_AFTER;

  return (
    <div className="">
      <div className={cn('relative', collapsible && !open && 'max-h-72 overflow-hidden')}>
        <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
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
