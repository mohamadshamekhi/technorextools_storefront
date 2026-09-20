import Link from 'next/link';

import { routes } from '@/config/routes';

type PdpBreadcrumbProps = { category: { title: string; slug: string }; title: string };

/** Visual counterpart of the server-injected BreadcrumbList JSON-LD. */
export function PdpBreadcrumb({ category, title }: PdpBreadcrumbProps) {
  const link =
    'hover:text-brand-600 focus-visible:ring-brand-500 inline-flex min-h-11 items-center rounded focus-visible:ring-2 focus-visible:outline-none';
  return (
    <nav aria-label="مسیر صفحه" className="text-foreground-muted pt-4 text-[13px]">
      <ol className="flex flex-wrap items-center gap-x-2">
        <li>
          <Link href={routes.home} className={link}>
            خانه
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href={routes.products} className={link}>
            همه محصولات
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href={routes.category(category.slug)} className={link}>
            {category.title}
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li aria-current="page" className="text-foreground max-w-[40ch] truncate font-semibold">
          {title}
        </li>
      </ol>
    </nav>
  );
}
