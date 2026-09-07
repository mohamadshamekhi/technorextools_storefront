import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

import { CartButton } from './cart-button';

export function HeaderActions() {
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <Link
        href={routes.account}
        className="border-hairline hover:border-brand-500 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors"
      >
        <Icon name="user" className="text-foreground-muted size-[17px]" />
        <span className="hidden sm:inline">حساب کاربری</span>
      </Link>
      <CartButton />
    </div>
  );
}
