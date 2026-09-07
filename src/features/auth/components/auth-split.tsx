import type { ReactNode } from 'react';

import { AuthBrandPanel } from './auth-brand-panel';

/** Full-height split screen: brand story on the left, the active form on the right. */
export function AuthSplit({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <AuthBrandPanel />
      <main className="bg-surface-muted flex items-center justify-center px-5 py-12 sm:px-10">
        {children}
      </main>
    </div>
  );
}
