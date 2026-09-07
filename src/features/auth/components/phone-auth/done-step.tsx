import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';

export function DoneStep({ isNewUser }: { isNewUser: boolean }) {
  return (
    <div className="text-center">
      <div className="relative mx-auto mb-6 size-22">
        <span className="absolute -inset-3 rounded-full bg-[oklch(0.5_0.14_155_/_0.15)] animate-[auth-pulse_1.8s_ease-in-out_infinite]" />
        <span className="relative grid size-22 place-items-center rounded-full bg-[oklch(0.95_0.04_150)] text-[oklch(0.5_0.14_155)] animate-[auth-pop_0.5s_cubic-bezier(0.22,1,0.36,1)]">
          <Icon name="check" className="size-10" />
        </span>
      </div>
      <h1 className="text-[1.3rem] font-black">
        {isNewUser ? 'ثبت‌نام با موفقیت انجام شد' : 'خوش آمدید!'}
      </h1>
      <p className="text-foreground-muted mt-2 text-[13.5px]">
        {isNewUser
          ? 'حساب کاربری شما با موفقیت ساخته شد.'
          : 'با موفقیت وارد حساب کاربری خود شدید.'}
      </p>
      <Link
        href={routes.home}
        className="bg-brand-500 hover:bg-brand-600 mt-7 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-[background-color,transform] hover:-translate-y-0.5"
      >
        ورود به فروشگاه
      </Link>
    </div>
  );
}
