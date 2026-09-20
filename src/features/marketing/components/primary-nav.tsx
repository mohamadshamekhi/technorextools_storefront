import Link from 'next/link';

import { Container, Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

import { PRIMARY_NAV } from '../data/navigation';

/** Secondary row of in-page anchors. Horizontally scrollable on small screens. */
export function PrimaryNav() {
  return (
    <nav aria-label="پیمایش اصلی" className="border-hairline bg-surface-muted/60 border-t">
      <Container className="flex items-center gap-1 overflow-x-auto py-2 text-sm font-semibold">
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-foreground-muted hover:text-brand-700 hover:bg-brand-50 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={routes.orderTracking}
          className="text-brand-700 bg-brand-50 ring-brand-100 ms-2 me-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 whitespace-nowrap ring-1"
        >
          <Icon name="truck" className="size-4" />
          پیگیری سفارش
        </Link>
      </Container>
    </nav>
  );
}
