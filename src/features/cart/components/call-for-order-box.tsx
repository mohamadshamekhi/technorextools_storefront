import { Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';

export function CallForOrderBox() {
  return (
    <div className="bg-accent-400/12 flex items-center gap-3.5 rounded-2xl p-5">
      <span className="bg-surface flex size-11 shrink-0 items-center justify-center rounded-xl">
        <Icon name="headset" className="text-brand-600 size-5" />
      </span>
      <div className="flex-1">
        <p className="text-[13.5px] font-bold">سفارش عمده یا کارگاهی؟</p>
        <p className="text-foreground-muted text-xs">برای تخفیف ویژه تماس بگیرید</p>
      </div>
      <a
        href={`tel:${siteConfig.phoneHref}`}
        className="bg-surface text-brand-600 shrink-0 rounded-lg px-4 py-2.5 text-[12.5px] font-bold whitespace-nowrap"
      >
        تماس بگیرید
      </a>
    </div>
  );
}
