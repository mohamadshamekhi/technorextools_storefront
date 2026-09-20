'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export type PdpTab = { id: string; label: string };

/** Sticky anchor tabs with scroll-spy and an underline that slides between tabs. */
export function PdpTabBar({ tabs }: { tabs: PdpTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const [line, setLine] = useState({ x: 0, width: 0 });
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const targets = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: '-160px 0px -55% 0px' },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tabs]);

  useEffect(() => {
    const el = itemRefs.current[active];
    if (el) setLine({ x: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  return (
    <nav
      aria-label="بخش‌های صفحه"
      className="bg-surface/95 border-hairline sticky top-24 z-30 -mx-1 mt-10 border-b backdrop-blur"
    >
      <ul className="relative flex [scrollbar-width:none] overflow-x-auto">
        {tabs.map((tab) => (
          <li key={tab.id} className="shrink-0">
            <a
              ref={(node) => {
                itemRefs.current[tab.id] = node;
              }}
              href={`#${tab.id}`}
              aria-current={active === tab.id ? 'true' : undefined}
              className={cn(
                'focus-visible:ring-brand-500 flex min-h-12 items-center px-4 text-sm font-semibold transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset',
                active === tab.id
                  ? 'text-foreground'
                  : 'text-foreground-muted hover:text-foreground',
              )}
            >
              {tab.label}
            </a>
          </li>
        ))}
        <span
          aria-hidden
          className="bg-accent-500 absolute bottom-0 left-0 h-0.5 w-px origin-left transition-transform duration-200 ease-out motion-reduce:transition-none"
          // Runtime-measured underline geometry.
          style={{ transform: `translateX(${line.x}px) scaleX(${line.width})` }}
        />
      </ul>
    </nav>
  );
}
