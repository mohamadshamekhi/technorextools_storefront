import Link from 'next/link';

import { Container, Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

import { PRIMARY_NAV } from '../data/navigation';

/** Secondary row of in-page anchors. Horizontally scrollable on small screens. */
export function PrimaryNav() {
  return (
    <nav aria-label="پیمایش اصلی" className="border-hairline border-t">
      <Container className="flex items-center gap-6 overflow-x-auto py-3 text-sm font-semibold">
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-foreground-muted hover:text-brand-600 whitespace-nowrap transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={routes.orderTracking}
          className="text-brand-600 me-auto flex items-center gap-1.5 whitespace-nowrap"
        >
          <Icon name="truck" className="size-4" />
          پیگیری سفارش
        </Link>
      </Container>
    </nav>
  );
}
