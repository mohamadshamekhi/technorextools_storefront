import { Container } from '@/components/atoms';
import { BrandLogo } from '@/components/molecules';

import { AnnouncementBar } from './announcement-bar';
import { HeaderActions } from './header-actions';
import { HeaderSearch } from './header-search';
import { PrimaryNav } from './primary-nav';
import styles from './store-header.module.css';

/** Sticky storefront masthead. Server Component — the cart badge is the only client leaf (the mobile menu/category triggers live in `MobileTabBar`). */
export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="hidden sm:block">
        <AnnouncementBar />
      </div>
      <div className="bg-surface/85 border-hairline border-b shadow-(--shadow-soft) backdrop-blur-xl">
        <Container className="flex items-center gap-3 py-2.5 sm:gap-6 sm:py-3.5">
          <BrandLogo className={`shrink-0 ${styles.logo}`} />
          <HeaderSearch className={`flex max-w-lg flex-1 ${styles.search}`} />
          <div className={`ms-auto hidden sm:block ${styles.actions}`}>
            <HeaderActions />
          </div>
        </Container>
        <div className="hidden sm:block">
          <PrimaryNav />
        </div>
      </div>
    </header>
  );
}
