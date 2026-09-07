import type { Metadata } from 'next';

import { routes } from '@/config/routes';
import { WishlistView } from '@/features/account';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'علاقه‌مندی‌ها',
  path: routes.dashboard.wishlist,
  noindex: true,
});

export default function WishlistPage() {
  return <WishlistView />;
}
