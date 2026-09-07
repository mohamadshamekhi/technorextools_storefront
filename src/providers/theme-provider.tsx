'use client';

import { useEffect, type ReactNode } from 'react';

import { ThemeMode } from '@/constants';
import { useUiStore } from '@/store/ui-store';

function resolve(mode: ThemeMode): 'light' | 'dark' {
  if (mode === ThemeMode.System) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode === ThemeMode.Dark ? 'dark' : 'light';
}

/** Reflects the persisted theme choice onto <html data-theme>. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useUiStore((s) => s.theme);

  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = resolve(theme);
    };
    apply();

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (theme === ThemeMode.System) {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
  }, [theme]);

  return <>{children}</>;
}
