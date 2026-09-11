'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { parseCatalogParams, toCatalogHref, type CatalogParams } from '../services/catalog.query';

/**
 * Reads the catalog filter state from the URL and writes updates back to it.
 * The page is a Server Component — every change is a server round-trip.
 */
export function useCatalogParams(lockedCategory?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const raw = Object.fromEntries(searchParams.entries());
    const parsed = parseCatalogParams(raw);
    return lockedCategory ? { ...parsed, category: lockedCategory } : parsed;
  }, [searchParams, lockedCategory]);

  const update = useCallback(
    (patch: Partial<CatalogParams>) => {
      const next: CatalogParams = { ...params, ...patch, page: undefined };
      if (lockedCategory) delete next.category;
      router.replace(toCatalogHref(pathname, next), { scroll: false });
    },
    [params, pathname, router, lockedCategory],
  );

  const goToPage = useCallback(
    (page: number) => {
      router.replace(toCatalogHref(pathname, { ...params, page }), { scroll: false });
    },
    [params, pathname, router],
  );

  return { params, update, goToPage };
}
