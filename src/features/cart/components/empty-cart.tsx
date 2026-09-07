import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

export function EmptyCart() {
  return (
    <section className="mx-auto max-w-lg py-28 text-center">
      <span className="bg-accent-400/12 mx-auto mb-6.5 flex size-24 items-center justify-center rounded-full">
        <Icon name="cart" className="text-brand-600 size-10" />
      </span>
      <h1 className="text-[1.35rem] font-black">سبد خرید شما خالی است</h1>
      <p className="text-foreground-muted mt-2.5 mb-7 text-sm">
        هنوز محصولی به سبد خریدتان اضافه نکرده‌اید.
      </p>
      <Link
        href={routes.products}
        className="bg-brand-500 hover:bg-brand-600 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-[background-color,transform] hover:-translate-y-0.5"
      >
        بازگشت به فروشگاه
      </Link>
    </section>
  );
}
