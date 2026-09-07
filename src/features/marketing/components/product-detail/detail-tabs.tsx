'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const TABS = [
  { id: 'description', label: 'توضیحات و کاربرد' },
  { id: 'specs', label: 'مشخصات فنی' },
  { id: 'reviews', label: 'نقد و نظر مشتریان' },
  { id: 'faq', label: 'سوالات متداول' },
] as const;

/** Sticky in-page nav for the product detail sections. */
export function DetailTabs() {
  const [active, setActive] = useState<string>(TABS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="بخش‌های محصول"
      className="border-hairline bg-surface-muted/90 sticky top-16 z-30 -mx-1 flex gap-1 overflow-x-auto border-b px-1 backdrop-blur"
    >
      {TABS.map((tab) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          aria-current={active === tab.id ? 'true' : undefined}
          className={cn(
            '-mb-px shrink-0 border-b-2 px-4 py-3.5 text-sm font-bold whitespace-nowrap transition-colors',
            active === tab.id
              ? 'border-brand-500 text-brand-600'
              : 'text-foreground-muted hover:text-foreground border-transparent',
          )}
        >
          {tab.label}
        </a>
      ))}
    </nav>
  );
}
