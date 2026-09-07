import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

export function EmptyCheckout() {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <span className="bg-accent-400/12 mx-auto mb-6 flex size-20 items-center justify-center rounded-full">
        <Icon name="cart" className="text-brand-600 size-9" />
      </span>
      <h1 className="text-[1.2rem] font-black">سبد خرید شما خالی است</h1>
      <p className="text-foreground-muted mt-2.5 mb-7 text-sm">
        برای پرداخت، ابتدا باید کالایی به سبد خرید اضافه کنید.
      </p>
      <Link
        href={routes.products}
        className="bg-brand-500 hover:bg-brand-600 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-[background-color,transform] hover:-translate-y-0.5"
      >
        بازگشت به فروشگاه
      </Link>
    </div>
  );
}
