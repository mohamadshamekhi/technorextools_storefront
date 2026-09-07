import type { ReactNode } from 'react';

/** Props for a Next.js segment layout. */
export type LayoutProps = {
  children: ReactNode;
  params?: Promise<Record<string, string>>;
};

/** Props for a Next.js page, including async params/searchParams (Next 15). */
export type PageProps<
  TParams extends Record<string, string> = Record<string, never>,
  TSearch extends Record<string, string | string[] | undefined> = Record<string, never>,
> = {
  params: Promise<TParams>;
  searchParams: Promise<TSearch>;
};

export type WithChildren<T = unknown> = T & { children: ReactNode };

/** Discriminated result type for server actions. */
export type ActionResult<T = void> =
  { ok: true; data: T } | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
