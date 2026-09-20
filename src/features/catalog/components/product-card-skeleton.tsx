import { cn } from '@/lib/utils';

/** Shimmer stand-in for `ProductCard` while the grid streams in — never an empty/broken tile. */
export function ProductCardSkeleton() {
  return (
    <div
      className="border-hairline bg-surface rounded-card flex flex-col overflow-hidden border shadow-(--shadow-soft)"
      aria-hidden
    >
      <div
        className={cn('bg-surface-muted relative aspect-square overflow-hidden', shimmerClass)}
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div
          className={cn('bg-surface-muted h-4 w-16 overflow-hidden rounded-full', shimmerClass)}
        />
        <div
          className={cn('bg-surface-muted h-4 w-full overflow-hidden rounded-full', shimmerClass)}
        />
        <div
          className={cn('bg-surface-muted h-4 w-2/3 overflow-hidden rounded-full', shimmerClass)}
        />
        <div className="border-hairline mt-auto flex flex-col gap-3 border-t pt-3.5">
          <div
            className={cn('bg-surface-muted h-6 w-24 overflow-hidden rounded-full', shimmerClass)}
          />
          <div
            className={cn(
              'bg-surface-muted h-10 w-full overflow-hidden rounded-full',
              shimmerClass,
            )}
          />
        </div>
      </div>
    </div>
  );
}

const shimmerClass =
  'relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,white_55%,transparent),transparent)]';
