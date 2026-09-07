import Link from 'next/link';

import { routes } from '@/config/routes';

export function ProductBreadcrumb({ title }: { title: string }) {
  return (
    <nav
      aria-label="مسیر صفحه"
      className="text-foreground-muted flex items-center gap-2 pt-6 text-xs"
    >
      <Link href={routes.home} className="hover:text-brand-600">
        خانه
      </Link>
      <span aria-hidden>/</span>
      <Link href={routes.products} className="hover:text-brand-600">
        همه محصولات
      </Link>
      <span aria-hidden>/</span>
      <span className="text-foreground truncate font-semibold">{title}</span>
    </nav>
  );
}
