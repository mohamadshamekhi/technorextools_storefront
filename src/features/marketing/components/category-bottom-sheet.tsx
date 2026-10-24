'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import type { CategoryNode } from '@/features/catalog';

import { CategoryAccordion } from './category-accordion';

type CategoryBottomSheetProps = {
  categories: CategoryNode[];
  onClose: () => void;
};

/** Mobile bottom-sheet counterpart to the desktop `CategoryMegaMenu` flyout — full tree as an accordion (`CategoryAccordion`). Portaled to `document.body` (sibling sheets must escape the tab bar's `backdrop-filter` containing block — see `mobile-menu.tsx`). */
export function CategoryBottomSheet({ categories, onClose }: CategoryBottomSheetProps) {
  return createPortal(
    <div className="fixed inset-0 z-70" role="dialog" aria-modal="true">
      <div className="bg-ink/40 absolute inset-0 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="bg-surface absolute inset-x-0 bottom-0 flex max-h-[80vh] flex-col rounded-t-3xl shadow-(--shadow-lift)">
        <div className="relative flex justify-center pt-3">
          <span className="bg-surface-sunken h-1.5 w-10 rounded-full" aria-hidden />
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="border-hairline bg-surface absolute inset-e-3 -top-1 grid size-9 place-items-center rounded-full border"
          >
            <Icon name="close" className="size-4.5" />
          </button>
        </div>
        <h2 className="border-hairline border-b px-5 pt-2 pb-4 text-base font-bold">
          دسته‌بندی‌ها
        </h2>
        <div className="min-h-0 flex-auto overflow-y-auto overscroll-contain px-3 py-2">
          <CategoryAccordion nodes={categories} onNavigate={onClose} />
        </div>
        <Link
          href={routes.products}
          onClick={onClose}
          className="text-brand-700 border-hairline mx-3 mb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-center gap-1 border-t px-3 py-3.5 text-[15px] font-bold"
        >
          مشاهده همه محصولات
          <Icon name="chevron" className="size-4" />
        </Link>
      </div>
    </div>,
    document.body,
  );
}
