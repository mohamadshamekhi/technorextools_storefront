import type { ReactNode } from 'react';

import { CheckoutTopbar } from '@/features/checkout';

/** Distraction-free shell: no store nav/search/cart, just a secure-checkout topbar. */
export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface-muted min-h-dvh">
      <CheckoutTopbar />
      <main className="mx-auto max-w-5xl px-6 py-8 sm:px-8">{children}</main>
    </div>
  );
}
