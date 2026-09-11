'use client';

import type { ReactNode } from 'react';

import { AuthModal } from '@/components/organisms';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

/** Single client boundary mounted once in the root layout. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        {children}
        <AuthModal />
      </ThemeProvider>
    </QueryProvider>
  );
}
