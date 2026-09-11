'use client';

import { useState, type ReactNode } from 'react';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { QUERY_STALE_TIME } from '@/constants';
import { UnauthorizedError } from '@/lib/api-error';
import { useAuthModalStore } from '@/store/auth-modal-store';

/** Any query/mutation that throws `UnauthorizedError` (session missing/expired) opens the
 * global sign-in modal in place, instead of a full-page redirect — the current path is kept
 * as `redirectTo` so `PhoneAuthFlow`'s success step can send the visitor right back. */
function handleUnauthorized(error: unknown) {
  if (!(error instanceof UnauthorizedError)) return;
  const redirectTo = typeof window === 'undefined' ? undefined : `${window.location.pathname}${window.location.search}`;
  useAuthModalStore.getState().open(redirectTo);
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({ onError: handleUnauthorized }),
        mutationCache: new MutationCache({ onError: handleUnauthorized }),
        defaultOptions: {
          queries: {
            staleTime: QUERY_STALE_TIME,
            retry: (failureCount, error) => !(error instanceof UnauthorizedError) && failureCount < 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
