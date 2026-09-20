'use client';

import { Icon } from '@/components/atoms';

import { useRemoveWishlistItem, useWishlist } from '../hooks/use-wishlist';
import { PageHeading } from './page-heading';
import { WishlistCard } from './wishlist-card';

export function WishlistView() {
  const wishlistQuery = useWishlist();
  const removeItem = useRemoveWishlistItem();

  const items = wishlistQuery.data ?? [];

  return (
    <div>
      <PageHeading title="علاقه‌مندی‌های من" subtitle="محصولاتی که برای بعد ذخیره کرده‌اید" />

      {wishlistQuery.isPending ? (
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="bg-surface-muted h-64 animate-pulse rounded-2xl" />
          <div className="bg-surface-muted h-64 animate-pulse rounded-2xl" />
          <div className="bg-surface-muted h-64 animate-pulse rounded-2xl" />
        </div>
      ) : wishlistQuery.isError ? (
        <p className="text-sale text-[13.5px]">
          بارگذاری علاقه‌مندی‌ها ناموفق بود. صفحه را رفرش کنید.
        </p>
      ) : items.length === 0 ? (
        <div className="border-hairline bg-surface-muted/60 flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-10 text-center">
          <Icon name="heart" className="text-brand-500 size-7" />
          <p className="text-foreground-muted text-[13px] leading-relaxed">
            هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <WishlistCard
              key={item.productId}
              item={item}
              onRemove={() => removeItem.mutate(item.productId)}
              removing={removeItem.isPending && removeItem.variables === item.productId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
