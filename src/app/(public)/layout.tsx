import { MiniCartDrawer } from '@/components/organisms';
import { StoreFooter, StoreHeader } from '@/features/marketing';
import type { WithChildren } from '@/types';

/** Public storefront shell. Rendered as RSC for maximum SEO + minimal JS. */
export default function PublicLayout({ children }: WithChildren) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="bg-brand-500 sr-only rounded-lg px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:absolute focus:top-3 focus:right-3 focus:z-70"
      >
        رفتن به محتوای اصلی
      </a>
      <StoreHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <StoreFooter />
      <MiniCartDrawer />
    </div>
  );
}
