import { Container, Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';

/** Thin utility strip above the header. Server-rendered, zero JS. */
export function AnnouncementBar() {
  return (
    <div className="surface-ink texture-grid text-[13px] text-surface/85">
      <Container className="relative flex items-center justify-between gap-4 py-2.5">
        <div className="flex items-center gap-5">
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="hover:text-accent-500 flex items-center gap-2 transition-colors"
          >
            <Icon name="phone" className="text-accent-500 size-3.5" />
            {siteConfig.phone}
          </a>
          <span className="hidden items-center gap-2 sm:flex">
            <Icon name="truck" className="text-accent-500 size-4" />
            ارسال سریع به سراسر ایران
          </span>
        </div>
        <span className="text-accent-500 flex items-center gap-2 font-semibold">
          <Icon name="shield" className="size-4" />
          <span className="hidden sm:inline">گارانتی اصالت روی تمام ابزارها</span>
          <span className="sm:hidden">گارانتی اصالت</span>
        </span>
      </Container>
    </div>
  );
}
