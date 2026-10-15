import { Container, Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';

import styles from './store-header.module.css';

const USPS = [
  { icon: 'truck', label: 'ارسال سریع به سراسر ایران' } as const,
  { icon: 'shield', label: 'گارانتی اصالت روی تمام ابزارها' } as const,
  { icon: 'refresh', label: 'بازگشت کالا تا ۷ روز' } as const,
  { icon: 'card', label: 'پرداخت امن با درگاه بانکی' } as const,
];

/** Sticky USP strip above the header nav. Server-rendered, zero JS; scrolls horizontally on mobile. */
export function AnnouncementBar() {
  return (
    <div className={`surface-ink texture-grid text-surface/85 text-[13px] ${styles.announcement}`}>
      <Container className="flex items-center gap-5 py-2.5">
        <a
          href={`tel:${siteConfig.phoneHref}`}
          className="hover:text-accent-500 flex shrink-0 items-center gap-2 font-semibold transition-colors"
        >
          <Icon name="phone" className="text-accent-500 size-3.5" />
          {siteConfig.phone}
        </a>
        <ul className="flex min-w-0 flex-1 scrollbar-none items-center gap-5 overflow-x-auto whitespace-nowrap">
          {USPS.map((usp) => (
            <li key={usp.label} className="flex shrink-0 items-center gap-2">
              <Icon name={usp.icon} className="text-accent-500 size-3.5" />
              {usp.label}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
