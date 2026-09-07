import { Container } from '@/components/atoms';
import { BrandLogo } from '@/components/molecules';
import { siteConfig } from '@/config/site';

import { SECTION } from '../../anchors';
import { FOOTER_COLUMNS } from '../../data/navigation';
import { FooterContact } from './footer-contact';
import { FooterNavColumn } from './footer-nav-column';
import { FooterSocialLinks } from './footer-social-links';
import { FooterTrustBar } from './footer-trust-bar';

export function StoreFooter() {
  return (
    <footer id={SECTION.contact} className="bg-ink scroll-mt-24 pt-16 text-white/85">
      <Container>
        <FooterTrustBar />
        <div className="grid gap-11 border-t border-white/10 py-11 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          <div>
            <BrandLogo tone="dark" className="mb-4" />
            <p className="mb-5 max-w-xs text-sm leading-relaxed">
              نمایندهٔ رسمی برند پوما ایر در ایران؛ ابزار بادی و شارژی صنعتی با گارانتی اصالت و
              پشتیبانی فنی.
            </p>
            <FooterSocialLinks />
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <FooterNavColumn key={column.title} column={column} />
          ))}
          <FooterContact />
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-[13px] text-white/55 sm:flex-row sm:justify-between">
          <span>© تمامی حقوق برای {siteConfig.name} محفوظ است.</span>
          <span className="font-display">PUMA AIR · TEHRAN</span>
        </div>
      </Container>
    </footer>
  );
}
