import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';

/** Page title for the cart — icon chip + item count, mirroring `CartUpsells`. */
export function CartHeading({ count }: { count: number }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="bg-brand-50 text-brand-600 flex size-10 items-center justify-center rounded-xl">
        <Icon name="cart" className="size-5" />
      </span>
      <h1 className="text-[1.6rem] font-black tracking-tight">
        سبد خرید شما{' '}
        <span className="text-foreground-muted font-display text-[1.1rem]">
          ({toPersianDigits(count)} کالا)
        </span>
      </h1>
    </div>
  );
}
