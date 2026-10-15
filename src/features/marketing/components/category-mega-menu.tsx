'use client';

import { createPortal } from 'react-dom';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { topLevelCategories, type CategoryNode } from '@/features/catalog';
import { cn } from '@/lib/utils';

import { useCategoryMenu } from '../hooks/use-category-menu';
import { usePanelPosition } from '../hooks/use-panel-position';
import { CategoryMegaMenuColumn } from './category-mega-menu-column';
import styles from './store-header.module.css';

/**
 * Header trigger + 3-level cascading flyout over the full category tree. Client leaf — tree is
 * server-fetched by the caller. The panel is portaled to `document.body` and positioned in fixed
 * viewport coordinates so it renders below the whole sticky header instead of being clipped by
 * the nav row's `overflow-x-auto` / the header's `backdrop-filter` containing block.
 */
export function CategoryMegaMenu({ categories }: { categories: CategoryNode[] }) {
  const {
    open,
    setOpen,
    l1,
    setL1,
    l2,
    setL2,
    close,
    openOnHover,
    closeOnHoverOut,
    rootRef,
    panelRef,
  } = useCategoryMenu();
  const position = usePanelPosition(rootRef, open);
  const topLevel = topLevelCategories(categories);
  const firstCategory = topLevel[0];
  if (!firstCategory) return null;

  const activeL1 = topLevel.find((node) => node.id === l1) ?? firstCategory;
  const l2List = activeL1.children;
  const activeL2 = l2List.find((node) => node.id === l2) ?? null;
  const l3List = activeL2?.children ?? [];

  const panel =
    open && position
      ? createPortal(
          <div
            ref={panelRef}
            role="menu"
            onMouseEnter={openOnHover}
            onMouseLeave={closeOnHoverOut}
            style={{ top: position.top, right: position.right }}
            className="bg-surface border-hairline fixed z-50 flex max-h-176 overflow-hidden rounded-2xl border shadow-(--shadow-lift)"
          >
            <CategoryMegaMenuColumn
              title="دسته‌بندی‌ها"
              items={topLevel}
              activeId={activeL1.id}
              onHoverItem={(node) => {
                setL1(node.id);
                setL2(null);
              }}
              withIcons
              viewAllHref={routes.products}
              onNavigate={close}
            />
            {l2List.length > 0 ? (
              <CategoryMegaMenuColumn
                title={activeL1.title}
                headerNode={activeL1}
                items={l2List}
                activeId={activeL2?.id ?? null}
                onHoverItem={(node) => setL2(node.id)}
                onBack={() => setL1(null)}
                withIcons
                viewAllHref={routes.category(activeL1.slug)}
                divider
                onNavigate={close}
              />
            ) : null}
            {activeL2 && l3List.length > 0 ? (
              <CategoryMegaMenuColumn
                title={activeL2.title}
                items={l3List}
                activeId={null}
                onHoverItem={() => {}}
                onBack={() => setL2(null)}
                viewAllHref={routes.category(activeL2.slug)}
                divider
                onNavigate={close}
              />
            ) : null}
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openOnHover}
      onMouseLeave={closeOnHoverOut}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-extrabold whitespace-nowrap transition-colors',
          'bg-accent-500 text-ink hover:bg-accent-600',
          styles.navItem,
        )}
      >
        <Icon name="menu" className="size-4" />
        دسته‌بندی
      </button>
      {panel}
    </div>
  );
}
