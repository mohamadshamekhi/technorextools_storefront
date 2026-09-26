import { Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';

import { WORK_HOURS } from '../data/contact';
import { ContactLocationCard } from './contact-location-card';
import { ContactShortcuts } from './contact-shortcuts';

/** Right column: location, working hours, self-serve shortcuts and a call prompt. */
export function ContactInfoPanel() {
  return (
    <div id="location" className="flex scroll-mt-24 flex-col gap-4">
      <ContactLocationCard />

      <div className="border-hairline bg-surface rounded-card border p-6 shadow-(--shadow-soft)">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-black">
          <Icon name="clock" className="text-brand-600 size-4" />
          ساعات کاری
        </h2>
        <ul className="flex flex-col gap-2.5">
          {WORK_HOURS.map((row) => (
            <li
              key={row.days}
              className="border-hairline flex items-center justify-between border-b pb-2.5 text-[13px] last:border-0 last:pb-0"
            >
              <span className="text-foreground-muted">{row.days}</span>
              <span className="font-bold">{row.hours}</span>
            </li>
          ))}
        </ul>
      </div>

      <ContactShortcuts />

      <a
        href={`tel:${siteConfig.phoneHref}`}
        className="bg-brand-50 ring-brand-100 rounded-card hover:bg-brand-100 flex items-center gap-3.5 p-5 ring-1 transition-colors"
      >
        <span className="bg-surface text-brand-600 grid size-11 shrink-0 place-items-center rounded-xl shadow-(--shadow-soft)">
          <Icon name="headset" className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13.5px] font-bold">
            مطمئن نیستید کدام ابزار مناسب کارتان است؟
          </span>
          <span className="text-foreground-muted block text-xs">
            کاربری و حجم کار را بگویید، مدل درست را پیشنهاد می‌دهیم — مشاوره رایگان.
          </span>
        </span>
        <span className="text-brand-600 shrink-0 text-[13px] font-black" dir="ltr">
          {siteConfig.phone}
        </span>
      </a>
    </div>
  );
}
