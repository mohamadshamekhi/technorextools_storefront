import { siteConfig } from '@/config/site';

export function FooterContact() {
  return (
    <div>
      <p className="mb-4 text-[15px] font-bold text-white">ارتباط با ما</p>
      <address className="flex flex-col gap-3 text-sm text-white/80 not-italic">
        <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-accent-500">
          تلفن: {siteConfig.phone}
        </a>
        <span>موبایل: ۰۹۱۲-۱۷۷۱۵۸۷</span>
        <a href={`mailto:${siteConfig.email}`} className="hover:text-accent-500" dir="ltr">
          {siteConfig.email}
        </a>
        <span className="leading-relaxed">{siteConfig.address}</span>
      </address>
    </div>
  );
}
