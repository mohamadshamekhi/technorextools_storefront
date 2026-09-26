'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import styles from './route-progress.module.css';

/** Same-tab, same-origin link click that will actually swap the route. */
function navigates(event: MouseEvent): boolean {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;

  const anchor = (event.target as Element | null)?.closest?.('a');
  if (!anchor || anchor.hasAttribute('download') || anchor.target === '_blank') return false;

  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#')) return false;

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  return url.pathname !== window.location.pathname || url.search !== window.location.search;
}

/**
 * Top progress bar for route changes. The App Router has no navigation events, so this starts
 * on a link click / back-forward and ends when `usePathname` reports the new route.
 * Mounted once in the root layout.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle');

  useEffect(() => {
    const start = () => setState('busy');
    const onClick = (event: MouseEvent) => {
      if (navigates(event)) start();
    };
    document.addEventListener('click', onClick, { capture: true });
    window.addEventListener('popstate', start);
    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      window.removeEventListener('popstate', start);
    };
  }, []);

  // The new route is on screen — close the bar, then unmount it after the fade.
  useEffect(() => {
    setState((current) => (current === 'busy' ? 'done' : 'idle'));
  }, [pathname]);

  useEffect(() => {
    if (state === 'idle') return;
    // `done` fades out; `busy` can't hang forever if a click never navigates.
    const timeout = window.setTimeout(() => setState('idle'), state === 'done' ? 420 : 12_000);
    return () => window.clearTimeout(timeout);
  }, [state]);

  if (state === 'idle') return null;

  return (
    <div
      role="progressbar"
      aria-label="در حال بارگذاری صفحه"
      aria-busy={state === 'busy'}
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-0.5"
    >
      <div
        className={cn(
          'h-full w-full bg-(image:--gradient-brand) shadow-(--shadow-brand)',
          styles.bar,
          state === 'done' && styles.done,
        )}
      />
    </div>
  );
}
