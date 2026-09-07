import { MediaPlaceholder } from '@/components/atoms';
import { cn } from '@/lib/utils';

/** Square product image slot; dims and stamps "ناموجود" when out of stock. */
export function ProductMedia({ inStock }: { inStock: boolean }) {
  return (
    <div className={cn('relative', !inStock && 'grayscale')}>
      <MediaPlaceholder label="عکس محصول" className="aspect-square text-[12px]" />
      {!inStock ? (
        <span className="absolute inset-0 grid place-items-center bg-black/35">
          <span className="bg-surface text-foreground rounded-full px-3.5 py-1.5 text-[12px] font-bold">
            ناموجود
          </span>
        </span>
      ) : null}
    </div>
  );
}
