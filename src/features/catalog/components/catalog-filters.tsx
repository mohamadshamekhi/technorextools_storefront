'use client';

import { useEffect, useRef, useState } from 'react';

import { Icon, Spinner } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { useCatalogParams } from '../hooks/use-catalog-params';
import { CLEAR_FILTERS_PATCH, countActiveFilters } from '../services/catalog.query';
import type { CategoryOption } from '../utils/category-tree';
import { CatalogFilterBody } from './catalog-filter-body';

type Option = { slug: string; title: string };

type CatalogFiltersProps = {
  categoryTree: CategoryOption[];
  categories: Option[];
  brands: Option[];
  total: number;
  lockedCategory?: string;
};

/**
 * Desktop: sticky sidebar that scrolls on its own. Mobile: a trigger button opening a bottom
 * sheet; filters still apply instantly via the URL, and the footer shows the live result count.
 */
export function CatalogFilters({ total, lockedCategory, ...facets }: CatalogFiltersProps) {
  const { params, update, isPending } = useCatalogParams(lockedCategory);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const activeCount = countActiveFilters(params, lockedCategory);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const badge =
    activeCount > 0 ? (
      <span className="bg-brand-500 grid size-5 place-items-center rounded-full text-[11px] font-black text-white tabular-nums">
        {toPersianDigits(activeCount)}
      </span>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="border-hairline bg-surface flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm font-bold shadow-(--shadow-soft) lg:hidden"
      >
        <Icon name="sliders" className="text-brand-600 size-4" />
        فیلتر محصولات
        {badge}
      </button>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          'animate-fade-in bg-ink/45 fixed inset-0 z-[60] backdrop-blur-[2px] lg:hidden',
          !open && 'hidden',
        )}
      />

      <aside
        aria-label="فیلترها"
        role={open ? 'dialog' : undefined}
        aria-modal={open || undefined}
        className={cn(
          'bg-surface fixed inset-x-0 bottom-0 z-[61] max-h-[88dvh] flex-col rounded-t-3xl shadow-(--shadow-float)',
          'lg:border-hairline lg:rounded-card lg:sticky lg:inset-auto lg:top-[11.5rem] lg:z-auto lg:flex lg:max-h-[calc(100dvh-12.5rem)] lg:border lg:shadow-(--shadow-soft)',
          open ? 'flex' : 'hidden',
        )}
      >
        <header className="border-hairline flex items-center justify-between gap-3 border-b px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <span className="bg-brand-50 text-brand-600 grid size-8 place-items-center rounded-lg">
              {isPending ? (
                <Spinner className="size-3.5" />
              ) : (
                <Icon name="sliders" className="size-4" />
              )}
            </span>
            فیلترها
            {badge}
          </h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              hidden={activeCount === 0}
              onClick={() => update(CLEAR_FILTERS_PATCH)}
              className="text-foreground-muted hover:text-sale min-h-9 cursor-pointer px-2 text-[13px] font-bold transition-colors"
            >
              پاک‌کردن همه
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="بستن فیلترها"
              className="border-hairline grid size-9 cursor-pointer place-items-center rounded-lg border lg:hidden"
            >
              <Icon name="close" className="size-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 [scrollbar-width:thin] overflow-y-auto overscroll-contain px-5 py-4">
          <CatalogFilterBody
            params={params}
            update={update}
            lockedCategory={lockedCategory}
            {...facets}
          />
        </div>

        <footer className="border-hairline border-t p-4 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="bg-brand-500 hover:bg-brand-600 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-colors"
          >
            {isPending ? <Spinner /> : null}
            {isPending ? 'در حال به‌روزرسانی…' : `نمایش ${toPersianDigits(total)} محصول`}
          </button>
        </footer>
      </aside>
    </>
  );
}
