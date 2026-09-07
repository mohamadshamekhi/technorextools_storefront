import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

export function CheckoutButton() {
  return (
    <>
      <Link
        href={routes.checkout}
        className="bg-brand-500 hover:bg-brand-600 mt-5 flex h-13 items-center justify-center gap-2 rounded-xl text-[15px] font-extrabold text-white shadow-lg transition-[background-color,transform] hover:-translate-y-0.5"
      >
        <Icon name="lock" className="size-4.5" />
        تکمیل سفارش و پرداخت
      </Link>
      <p className="text-foreground-muted mt-3 flex items-center justify-center gap-1.5 text-[11.5px]">
        <Icon name="shield" className="size-3.5" />
        پرداخت امن با گارانتی اصالت کالا
      </p>
    </>
  );
}
