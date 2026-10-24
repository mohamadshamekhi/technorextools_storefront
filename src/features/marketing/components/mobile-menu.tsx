'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '@/components/atoms';
import { BrandLogo } from '@/components/molecules';
import { routes } from '@/config/routes';
import type { CategoryNode } from '@/features/catalog';

import { PRIMARY_NAV } from '../data/navigation';
import { DrawerCategories } from './drawer-categories';
import styles from './mobile-menu.module.css';

const DRAWER_LINKS = [
  ...PRIMARY_NAV.map((item) => ({ label: item.label, href: item.href, icon: null }) as const),
  { label: 'پیگیری سفارش', href: routes.orderTracking, icon: 'truck' } as const,
  { label: 'حساب کاربری', href: routes.account, icon: 'user' } as const,
];

/** Slide-in drawer carrying the secondary nav links — mounted by the bottom tab bar's «منو» tab, same conditional-mount pattern as `CategoryBottomSheet`. */
export function MobileMenuDrawer({
  categories,
  onClose,
}: {
  categories: CategoryNode[];
  onClose: () => void;
}) {
  const pathname = usePathname();
  const initialPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== initialPathname.current) onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(<Drawer categories={categories} onClose={onClose} />, document.body);
}

function Drawer({ categories, onClose }: { categories: CategoryNode[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-70 sm:hidden" role="dialog" aria-modal="true">
      <div
        className={`bg-ink/40 absolute inset-0 backdrop-blur-sm ${styles.backdrop}`}
        onClick={onClose}
        aria-hidden
      />
      <div
        className={`bg-surface absolute inset-y-0 start-0 flex w-[85%] max-w-sm flex-col gap-5 overflow-y-auto p-5 shadow-(--shadow-lift) ${styles.panel}`}
      >
        <div className="flex items-center justify-between">
          <BrandLogo />
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن منو"
            className="border-hairline bg-surface grid size-9 place-items-center rounded-full border"
          >
            <Icon name="close" className="size-4.5" />
          </button>
        </div>
        <nav aria-label="منوی موبایل" className="flex flex-col gap-1">
          <DrawerCategories categories={categories} onNavigate={onClose} />
          {DRAWER_LINKS.map((link) => (
            <DrawerLink key={link.href} href={link.href} icon={link.icon}>
              {link.label}
            </DrawerLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

function DrawerLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: 'truck' | 'user' | null;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:bg-brand-50 hover:text-brand-700 flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-semibold transition-colors"
    >
      {icon ? <Icon name={icon} className="text-brand-500 size-[18px]" /> : null}
      <span className="flex-1">{children}</span>
      <Icon name="chevronEnd" className="text-foreground-muted size-4" />
    </Link>
  );
}
