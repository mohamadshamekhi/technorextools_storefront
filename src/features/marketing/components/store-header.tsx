import { Container } from '@/components/atoms';
import { BrandLogo } from '@/components/molecules';

import { AnnouncementBar } from './announcement-bar';
import { HeaderActions } from './header-actions';
import { HeaderSearch } from './header-search';
import { PrimaryNav } from './primary-nav';

/** Sticky storefront masthead. Server Component — the cart badge is the only client leaf. */
export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="bg-surface/85 border-hairline border-b shadow-(--shadow-soft) backdrop-blur-xl">
        <Container className="flex items-center gap-6 py-3.5">
          <BrandLogo className="shrink-0" />
          <HeaderSearch className="hidden max-w-lg flex-1 md:flex" />
          <div className="ms-auto">
            <HeaderActions />
          </div>
        </Container>
        <Container className="pb-3 md:hidden">
          <HeaderSearch />
        </Container>
        <PrimaryNav />
      </div>
    </header>
  );
}
