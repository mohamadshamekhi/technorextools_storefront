import Link from 'next/link';

import { MediaPlaceholder } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman, toPersianDigits } from '@/lib/persian';

import type { BundleItem } from '../../services/bundles.schemas';
import { memberUnavailableLabel } from '../../utils/bundle';

/** One member of a bundle, as a product tile inside the package band. */
export function BundleMemberCard({ item }: { item: BundleItem }) {
  const { variant } = item;
  const unavailable = memberUnavailableLabel(item);

  return (
    <Link
      href={routes.product(variant.product.slug)}
      className="border-hairline bg-surface hover:border-brand-500/40 group flex min-w-0 flex-1 basis-44 flex-col gap-3 rounded-2xl border p-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5"
    >
      <div className="relative">
        <MediaPlaceholder
          label={variant.product.title}
          src={variant.imageUrl ?? undefined}
          sizes="(max-width: 640px) 45vw, 180px"
          className="bg-surface-muted aspect-4/3 rounded-xl text-[9px]"
        />
        <span className="bg-ink/85 absolute end-2 top-2 rounded-full px-2 py-0.5 text-[10.5px] font-bold text-white">
          ×{toPersianDigits(item.qty)}
        </span>
        {unavailable ? (
          <span className="bg-sale absolute start-2 top-2 rounded-full px-2 py-0.5 text-[10.5px] font-bold text-white">
            {unavailable}
          </span>
        ) : null}
      </div>

      <div className="min-w-0">
        <p className="group-hover:text-brand-600 line-clamp-2 text-[13px] leading-6 font-bold transition-colors">
          {variant.product.title}
        </p>
        <p className="text-foreground-muted mt-1 text-[11.5px] tabular-nums">
          {variant.colorName ? `${variant.colorName} · ` : ''}
          {formatToman(variant.effectivePrice)} تومان
        </p>
      </div>
    </Link>
  );
}
