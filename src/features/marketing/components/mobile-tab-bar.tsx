'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Icon, type IconName } from '@/components/atoms';
import { routes } from '@/config/routes';
import type { CategoryNode } from '@/features/catalog';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/ui-store';

import { useCartQuantity } from '../hooks/use-cart-quantity';
import { toPersianDigits } from '../utils/persian';
import { CategoryBottomSheet } from './category-bottom-sheet';
import { MobileMenuDrawer } from './mobile-menu';

type Tab = { label: string; href: string; icon: IconName };

const LEADING_TABS: Tab[] = [{ label: 'خانه', href: routes.home, icon: 'home' }];
const TRAILING_TAB: Tab = { label: 'حساب من', href: routes.account, icon: 'user' };

function isActive(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

type MobileTabBarProps = {
  categories: CategoryNode[];
};

/** App-style bottom tab bar — mobile only, replaces desktop header chrome below `sm`. */
export function MobileTabBar({ categories }: MobileTabBarProps) {
  const pathname = usePathname();
  const quantity = useCartQuantity();
  const setMiniCartOpen = useUiStore((state) => state.setMiniCartOpen);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="پیمایش پایین صفحه"
        className="border-hairline bg-surface/95 fixed inset-x-0 bottom-0 z-50 border-t shadow-(--shadow-float) backdrop-blur-xl sm:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ul className="grid grid-cols-5 items-center">
          {LEADING_TABS.map((tab) => (
            <TabItem key={tab.href} tab={tab} active={isActive(tab.href, pathname)} />
          ))}
          <li>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-label="باز کردن دسته‌بندی‌ها"
              aria-expanded={sheetOpen}
              className={cn(
                'flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors',
                sheetOpen ? 'text-brand-600' : 'text-foreground-muted',
              )}
            >
              <Icon name="grid" className="size-5" />
              دسته‌بندی
            </button>
          </li>
          <li className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setMiniCartOpen(true)}
              aria-label="باز کردن سبد خرید"
              className="bg-brand-500 shadow-brand-500/30 ring-surface relative -mt-6 grid size-14 place-items-center rounded-full text-white shadow-lg ring-4"
            >
              <Icon name="cart" className="size-6" />
              {quantity > 0 ? (
                <span
                  key={quantity}
                  className="animate-badge-pop bg-ink absolute -top-1 -left-1 grid size-5 place-items-center rounded-full text-[11px] font-bold text-white"
                >
                  {toPersianDigits(quantity)}
                </span>
              ) : null}
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
              className={cn(
                'flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors',
                menuOpen ? 'text-brand-600' : 'text-foreground-muted',
              )}
            >
              <Icon name="menu" className="size-5" />
              منو
            </button>
          </li>
          <TabItem tab={TRAILING_TAB} active={isActive(TRAILING_TAB.href, pathname)} />
        </ul>
      </nav>
      {sheetOpen ? (
        <CategoryBottomSheet categories={categories} onClose={() => setSheetOpen(false)} />
      ) : null}
      {menuOpen ? (
        <MobileMenuDrawer categories={categories} onClose={() => setMenuOpen(false)} />
      ) : null}
    </>
  );
}

function TabItem({ tab, active }: { tab: Tab; active: boolean }) {
  return (
    <li>
      <Link
        href={tab.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors',
          active ? 'text-brand-600' : 'text-foreground-muted',
        )}
      >
        <Icon name={tab.icon} className="size-5" />
        {tab.label}
      </Link>
    </li>
  );
}
