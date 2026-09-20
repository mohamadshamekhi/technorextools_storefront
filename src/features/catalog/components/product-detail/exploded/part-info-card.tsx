import Link from 'next/link';

import { routes } from '@/config/routes';
import { toPersianDigits } from '@/lib/persian';

import type { ExplodedPart } from '../../../types/pdp';

/** Details for the hovered/pinned part; prompts the user to click when nothing is selected. */
export function PartInfoCard({ part }: { part: ExplodedPart | undefined }) {
  if (!part) return <></>;
  return (
    <div
      className="border-hairline bg-surface flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3"
      aria-live="polite"
    >
      <span className="bg-accent-500 text-ink grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold">
        {toPersianDigits(part.number)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{part.name}</p>
        <p className="text-foreground-muted text-xs">
          کد قطعه: <bdi className="font-display">{part.code}</bdi>
        </p>
      </div>
      {part.sellable ? (
        <Link
          href={`${routes.search}?q=${encodeURIComponent(part.code)}`}
          className="text-brand-600 focus-visible:ring-brand-500 inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          سفارش قطعه
        </Link>
      ) : null}
    </div>
  );
}
