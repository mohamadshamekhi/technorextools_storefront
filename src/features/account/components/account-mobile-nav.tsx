import { ACCOUNT_NAV } from '../data/nav';
import { AccountNavLink } from './account-nav-link';

/** Horizontally scrolling nav shown instead of the sidebar on small screens. */
export function AccountMobileNav() {
  return (
    <nav className="border-hairline bg-surface -mx-4 flex gap-1.5 overflow-x-auto border-b px-4 py-2.5 sm:-mx-6 sm:px-6 lg:hidden">
      {ACCOUNT_NAV.map((item) => (
        <div key={item.href} className="shrink-0">
          <AccountNavLink item={item} />
        </div>
      ))}
    </nav>
  );
}
