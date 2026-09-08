import Link from 'next/link';

import { PillLink } from '@/components/atoms';
import { routes } from '@/config/routes';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="font-display text-gradient-brand text-[5rem] leading-none font-black">۴۰۴</p>
      <h1 className="text-2xl font-black tracking-tight">صفحه پیدا نشد</h1>
      <p className="text-foreground-muted text-sm leading-loose text-pretty">
        نشانی‌ای که دنبالش بودید وجود ندارد یا جابه‌جا شده است. از این‌جا ادامه دهید:
      </p>
      <div className="mt-1 flex flex-wrap justify-center gap-3">
        <PillLink href={routes.home}>بازگشت به خانه</PillLink>
        <PillLink href={routes.products} variant="outline">
          مشاهدهٔ محصولات
        </PillLink>
      </div>
      <Link href={routes.orderTracking} className="text-brand-600 text-[13px] font-bold">
        پیگیری سفارش
      </Link>
    </main>
  );
}
