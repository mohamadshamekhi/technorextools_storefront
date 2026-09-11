import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { formatToman, toPersianDigits } from '@/lib/persian';

import type { PlacedOrder } from '../types';

export function SuccessStep({ order }: { order: PlacedOrder }) {
  return (
    <div className="border-hairline bg-surface relative overflow-hidden rounded-3xl border p-12 text-center">
      <div className="relative mx-auto mb-6 size-24">
        <span className="absolute -inset-3.5 rounded-full bg-[oklch(0.5_0.14_155/0.15)] animate-[auth-pulse_1.8s_ease-in-out_infinite]" />
        <span className="relative grid size-24 place-items-center rounded-full bg-[oklch(0.95_0.04_150)] text-[oklch(0.5_0.14_155)] animate-[auth-pop_0.5s_cubic-bezier(0.22,1,0.36,1)]">
          <Icon name="check" className="size-11" />
        </span>
      </div>

      <h1 className="text-[1.45rem] font-black">سفارش شما با موفقیت ثبت شد</h1>
      <p className="text-foreground-muted mt-2.5 mb-7 text-sm">
        پیامک اطلاعات سفارش برای شما ارسال شد.
      </p>

      <div className="bg-surface-sunken mx-auto mb-7 flex max-w-xs items-center justify-center gap-2.5 rounded-2xl px-5 py-3.5">
        <span className="text-foreground-muted text-[13px]">کد پیگیری سفارش</span>
        <span className="font-display text-[16px] font-bold tracking-wide">{order.orderNumber}</span>
      </div>

      <div className="mx-auto mb-8 grid max-w-lg grid-cols-3 gap-3.5">
        <div className="bg-surface-sunken rounded-2xl px-2.5 py-4">
          <p className="font-display text-[16px] font-bold">{formatToman(order.total)}</p>
          <p className="text-foreground-muted mt-1 text-[11.5px]">تومان پرداختی</p>
        </div>
        <div className="bg-surface-sunken rounded-2xl px-2.5 py-4">
          <p className="font-display text-[16px] font-bold">{toPersianDigits(order.itemCount)}</p>
          <p className="text-foreground-muted mt-1 text-[11.5px]">کل کالا</p>
        </div>
        <div className="bg-surface-sunken rounded-2xl px-2.5 py-4">
          <p className="font-display text-[16px] font-bold">۲-۳ روز</p>
          <p className="text-foreground-muted mt-1 text-[11.5px]">زمان تحویل</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href={routes.products}
          className="bg-brand-500 hover:bg-brand-600 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-[background-color,transform] hover:-translate-y-0.5"
        >
          بازگشت به فروشگاه
        </Link>
        <Link
          href={routes.orderTracking}
          className="border-hairline inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold"
        >
          پیگیری سفارش
        </Link>
      </div>
    </div>
  );
}
