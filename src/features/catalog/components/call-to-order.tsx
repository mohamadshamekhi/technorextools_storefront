import { Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export const CALL_TO_ORDER_MESSAGE = 'برای اطلاع از موجودی و ثبت سفارش تماس بگیرید';

const FOCUS =
  'focus-visible:ring-brand-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none';

/** Full-width phone CTA, replacing add-to-cart when stock is too low to sell online. */
export function CallToOrderButton({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${siteConfig.phoneHref}`}
      className={cn(
        'bg-brand-600 hover:bg-brand-700 text-surface flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-extrabold transition-colors',
        FOCUS,
        className,
      )}
    >
      <Icon name="phone" className="size-5" />
      تماس <bdi>{siteConfig.phone}</bdi>
    </a>
  );
}

/** Icon-only phone CTA for product cards. */
export function CallToOrderIconLink({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${siteConfig.phoneHref}`}
      aria-label={CALL_TO_ORDER_MESSAGE}
      className={cn(
        'bg-brand-600 hover:bg-brand-700 text-surface grid size-11 shrink-0 place-items-center transition-colors',
        FOCUS,
        className,
      )}
    >
      <Icon name="phone" className="size-5" />
    </a>
  );
}
