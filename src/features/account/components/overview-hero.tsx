import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';
import type { SessionUser } from '@/lib/session';

import type { Membership } from '../types';

/** Greeting banner: who you are, your loyalty tier and how far the next one is. */
export function OverviewHero({ user, membership }: { user: SessionUser; membership: Membership }) {
  return (
    <section className="relative isolate overflow-hidden rounded-[1.75rem] bg-(image:--gradient-brand) p-6 text-white shadow-(--shadow-brand) sm:p-8">
      <span
        aria-hidden
        className="absolute -start-16 -top-24 size-64 rounded-full bg-white/10 blur-2xl"
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-[12.5px] font-bold text-white/70">
            {membership.lifetimePoints} · باشگاه مشتریان تکنورکس
          </p>
          <h1 className="mt-1.5 text-2xl font-black tracking-tight sm:text-[1.7rem]">
            سلام{user.name ? `، ${user.name}` : ''} 👋
          </h1>
          <p className="mt-1.5 text-[13.5px] text-white/75">
            خلاصه‌ای از سفارش‌ها، خریدها و امتیاز عضویت شما
          </p>
        </div>

        <div className="w-full max-w-sm rounded-2xl bg-white/12 p-4 ring-1 ring-white/20 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-white/20">
              <Icon name="award" className="size-[18px]" />
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-bold">سطح {membership.tier}</p>
              <p className="text-[11.5px] text-white/75">{membership.toNextLabel}</p>
            </div>
            <span className="ms-auto text-[13px] font-black">
              {toPersianDigits(membership.progress)}٪
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={membership.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="پیشرفت سطح عضویت"
            className="h-2 overflow-hidden rounded-full bg-white/25"
          >
            <span
              className="bg-accent-400 block h-full rounded-full transition-[width] duration-700"
              style={{ width: `${Math.max(membership.progress, 4)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
