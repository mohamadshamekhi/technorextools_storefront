import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

/** Shown when the query returns nothing — offers a way out instead of a dead end. */
export function SparePartsEmpty({ q, failed = false }: { q?: string; failed?: boolean }) {
  return (
    <div className="border-hairline bg-surface rounded-card flex flex-col items-center border border-dashed px-6 py-16 text-center">
      <span className="bg-brand-50 text-brand-500 mb-5 grid size-16 place-items-center rounded-2xl">
        <Icon name={failed ? 'alert' : 'search'} className="size-7" />
      </span>
      <p className="text-lg font-black">
        {failed ? 'فهرست قطعات در دسترس نیست' : 'قطعه‌ای پیدا نشد'}
      </p>
      <p className="text-foreground-muted mt-2 max-w-md text-sm leading-loose">
        {failed
          ? 'ارتباط با سرور برقرار نشد. چند لحظه بعد دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.'
          : q
            ? `برای «${q}» نتیجه‌ای نداشتیم. املای شماره فنی را بررسی کنید یا نام قطعه را کوتاه‌تر بنویسید.`
            : 'هنوز قطعه‌ای در این بخش ثبت نشده است.'}
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href={routes.spareParts}
          className="bg-brand-500 flex min-h-11 items-center rounded-xl bg-(image:--gradient-brand) px-5 text-sm font-bold text-white shadow-(--shadow-brand) transition-[filter] hover:brightness-110"
        >
          نمایش همه قطعات
        </Link>
        <Link
          href={routes.contact}
          className="border-hairline text-foreground hover:border-brand-300 hover:text-brand-600 flex min-h-11 items-center rounded-xl border px-5 text-sm font-bold transition-colors"
        >
          درخواست قطعه از کارشناس
        </Link>
      </div>
    </div>
  );
}
