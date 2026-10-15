'use client';

import { createPortal } from 'react-dom';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { topLevelCategories, type CategoryNode } from '@/features/catalog';

import { CategoryMegaMenuColumn } from './category-mega-menu-column';

type CategoryBottomSheetProps = {
  categories: CategoryNode[];
  onClose: () => void;
};

/** Mobile bottom-sheet counterpart to the desktop `CategoryMegaMenu` flyout — top-level categories only, tap to navigate. Portaled to `document.body` (sibling sheets must escape the tab bar's `backdrop-filter` containing block — see `mobile-menu.tsx`). */
export function CategoryBottomSheet({ categories, onClose }: CategoryBottomSheetProps) {
  const topLevel = topLevelCategories(categories);

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
        <div className="overflow-y-auto">
          <CategoryMegaMenuColumn
            title="دسته‌بندی‌ها"
            items={topLevel}
            activeId={null}
            onHoverItem={() => {}}
            withIcons
            viewAllHref={routes.products}
            onNavigate={onClose}
            className="w-full"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
