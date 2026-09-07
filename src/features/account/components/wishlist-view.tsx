import { WISHLIST } from '../data/wishlist';
import { PageHeading } from './page-heading';
import { WishlistCard } from './wishlist-card';

export function WishlistView() {
  return (
    <div>
      <PageHeading title="علاقه‌مندی‌های من" subtitle="محصولاتی که برای بعد ذخیره کرده‌اید" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WISHLIST.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
