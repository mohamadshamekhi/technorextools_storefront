import Link from 'next/link';
import type { CSSProperties } from 'react';

import { Container, Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { getCategoryTree } from '@/features/catalog/services/catalog.api';

import { PRIMARY_NAV } from '../data/navigation';
import { CategoryMegaMenu } from './category-mega-menu';
import { PrimaryNavLink } from './primary-nav-link';
import styles from './store-header.module.css';

/** Secondary row: category flyout + in-page anchors. Horizontally scrollable on small screens. */
export async function PrimaryNav() {
  const categories = await getCategoryTree().catch(() => []);
  const trackingDelay = { '--nav-delay': `${(PRIMARY_NAV.length + 1) * 60}ms` } as CSSProperties;

  return (
    <nav
      aria-label="پیمایش اصلی"
      className={`border-hairline bg-surface-muted/60 border-t ${styles.navRow}`}
    >
      <Container className="flex items-center gap-1 overflow-x-auto py-2 text-sm font-semibold">
        <CategoryMegaMenu categories={categories} />
        {PRIMARY_NAV.map((item, index) => (
          <PrimaryNavLink key={item.href} item={item} delayMs={(index + 1) * 60} />
        ))}
        <Link
          href={routes.orderTracking}
          style={trackingDelay}
          className={`text-brand-700 bg-brand-50 ring-brand-100 ms-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 whitespace-nowrap ring-1 ${styles.navItem}`}
        >
          <Icon name="truck" className="size-4" />
          پیگیری سفارش
        </Link>
      </Container>
    </nav>
  );
}
