'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

import type { NavItem } from '../types';
import styles from './store-header.module.css';

/** True for the entry that owns the current route. In-page anchors (`/#deals`) never own one. */
function isActive(href: string, pathname: string): boolean {
  if (href.includes('#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

type PrimaryNavLinkProps = {
  item: NavItem;
  /** Entrance stagger offset in ms — runtime-computed per row index. */
  delayMs?: number;
};

/** One entry of the storefront nav row — client leaf, only for the active highlight. */
export function PrimaryNavLink({ item, delayMs }: PrimaryNavLinkProps) {
  const pathname = usePathname();
  const active = isActive(item.href, pathname);

  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      style={delayMs ? ({ '--nav-delay': `${delayMs}ms` } as CSSProperties) : undefined}
      className={cn(
        'rounded-full px-3 py-1.5 whitespace-nowrap transition-colors',
        styles.navItem,
        active
          ? 'bg-brand-50 text-brand-700 ring-brand-100 ring-1'
          : 'text-foreground-muted hover:text-brand-700 hover:bg-brand-50',
      )}
    >
      {item.label}
    </Link>
  );
}
