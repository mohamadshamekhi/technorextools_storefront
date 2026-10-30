'use client';

import { useEffect, useRef, useState } from 'react';

import { Icon, Spinner } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import { cn } from '@/lib/utils';

import { useCatalogParams } from '../hooks/use-catalog-params';
import { CLEAR_FILTERS_PATCH, countActiveFilters } from '../services/catalog.query';
import type { CategoryOption } from '../utils/category-tree';
import type { BrandOption } from './brand-filter';
import { CatalogFilterBody } from './catalog-filter-body';

type Option = { slug: string; title: string };

type CatalogFiltersProps = {
  categoryTree: CategoryOption[];
  categories: Option[];
  brands: BrandOption[];
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
      <span className="bg-brand-500 grid size-5 place-items-center rounded-full text-[11px] font-black text-white tabular-nums ring-2 ring-white/20">
        {toPersianDigits(activeCount)}
      </span>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="bg-ink flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white shadow-(--shadow-lift) lg:hidden"
      >
        <Icon name="sliders" className="text-accent-400 size-4" />
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
          'lg:border-hairline lg:rounded-card lg:sticky lg:inset-auto lg:top-[11.5rem] lg:z-auto lg:flex lg:max-h-[calc(100dvh-12.5rem)] lg:overflow-hidden lg:border lg:shadow-(--shadow-soft)',
          open ? 'flex' : 'hidden',
        )}
      >
        <header className="bg-ink relative shrink-0 overflow-hidden rounded-t-3xl px-5 pt-5 pb-4 text-white lg:rounded-t-[inherit]">
          <span
            aria-hidden="true"
            className="bg-brand-500/40 pointer-events-none absolute -end-10 -top-16 size-40 rounded-full blur-3xl"
          />
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="bg-accent-500 text-ink grid size-10 place-items-center rounded-xl shadow-(--shadow-accent)">
                {isPending ? (
                  <Spinner className="size-4" />
                ) : (
                  <Icon name="sliders" className="size-5" />
                )}
              </span>
              <div>
                <h2 className="flex items-center gap-2 text-[15px] font-black">
                  فیلتر محصولات
                  {badge}
                </h2>
                <p className="mt-0.5 text-[12px] text-white/65">
                  <span className="text-accent-400 font-bold tabular-nums">
                    {toPersianDigits(total)}
                  </span>{' '}
                  محصول مطابق انتخاب شما
                </p>
              </div>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="بستن فیلترها"
              className="grid size-9 cursor-pointer place-items-center rounded-lg bg-white/10 transition-colors hover:bg-white/20 lg:hidden"
            >
              <Icon name="close" className="size-4" />
            </button>
          </div>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={() => update(CLEAR_FILTERS_PATCH)}
              className="relative mt-3 flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-3 text-[12px] font-bold transition-colors hover:bg-white/20"
            >
              <Icon name="refresh" className="size-3.5" />
              پاک‌کردن همه‌ی فیلترها
            </button>
          ) : null}
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
