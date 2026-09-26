'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import type { NavItem } from '../types';

/** True for the entry that owns the current route. In-page anchors (`/#deals`) never own one. */
function isActive(href: string, pathname: string): boolean {
  if (href.includes('#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** One entry of the storefront nav row — client leaf, only for the active highlight. */
export function PrimaryNavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = isActive(item.href, pathname);

  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'rounded-full px-3 py-1.5 whitespace-nowrap transition-colors',
        active
          ? 'bg-brand-50 text-brand-700 ring-brand-100 ring-1'
          : 'text-foreground-muted hover:text-brand-700 hover:bg-brand-50',
      )}
    >
      {item.label}
    </Link>
  );
}
