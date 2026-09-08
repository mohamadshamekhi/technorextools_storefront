import { Icon, MediaPlaceholder } from '@/components/atoms';

import { WORK_HOURS } from '../data/contact';

/** Right column: map stand-in, working hours and a support prompt. */
export function ContactInfoPanel() {
  return (
    <div id="location" className="flex scroll-mt-24 flex-col gap-4">
      <MediaPlaceholder
        label="نقشهٔ موقعیت فروشگاه"
        className="rounded-card aspect-[4/3] text-[13px]"
      />

      <div className="border-hairline bg-surface rounded-card border p-6 shadow-(--shadow-soft)">
        <h2 className="mb-4 text-sm font-black">ساعات کاری</h2>
        <ul className="flex flex-col gap-2.5">
          {WORK_HOURS.map((row) => (
            <li key={row.days} className="flex items-center justify-between text-[13px]">
              <span className="text-foreground-muted">{row.days}</span>
              <span className="font-bold">{row.hours}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-brand-50 ring-brand-100 rounded-card flex items-center gap-3.5 p-5 ring-1">
        <span className="bg-surface text-brand-600 grid size-11 shrink-0 place-items-center rounded-xl shadow-(--shadow-soft)">
          <Icon name="headset" className="size-5" />
        </span>
        <div>
          <p className="text-[13.5px] font-bold">پشتیبانی فنی می‌خواهید؟</p>
          <p className="text-foreground-muted text-xs">
            همین حالا با کارشناسان ما تماس بگیرید.
          </p>
        </div>
      </div>
    </div>
  );
}
