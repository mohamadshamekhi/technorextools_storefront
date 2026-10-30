'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useTransition } from 'react';

import { parseCatalogParams, toCatalogHref, type CatalogParams } from '../services/catalog.query';

/**
 * Reads the catalog filter state from the URL and writes updates back to it.
 * The page is a Server Component — every change is a server round-trip; `isPending`
 * stays true until the new RSC payload lands, so the caller can show progress.
 */
export function useCatalogParams(lockedCategory?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const params = useMemo(() => {
    const raw = Object.fromEntries(searchParams.entries());
    const parsed = parseCatalogParams(raw);
    return lockedCategory ? { ...parsed, category: lockedCategory } : parsed;
  }, [searchParams, lockedCategory]);

  const update = useCallback(
    (patch: Partial<CatalogParams>) => {
      const next: CatalogParams = { ...params, ...patch, page: undefined };
      if (lockedCategory) delete next.category;
      startTransition(() => router.replace(toCatalogHref(pathname, next), { scroll: false }));
    },
    [params, pathname, router, lockedCategory, startTransition],
  );

  const goToPage = useCallback(
    (page: number) => {
      const next: CatalogParams = { ...params, page };
      if (lockedCategory) delete next.category;
      startTransition(() => router.replace(toCatalogHref(pathname, next), { scroll: false }));
    },
    [params, pathname, router, lockedCategory, startTransition],
  );

  return { params, update, goToPage, isPending };
}
