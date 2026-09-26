import { Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';

import { MAP_LINKS } from '../data/contact';

const LINK_CLASS =
  'flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-bold transition-colors';

/** Address block with direct routing links — replaces the dead map stand-in. */
export function ContactLocationCard() {
  return (
    <div className="surface-ink rounded-card relative overflow-hidden p-6 text-white sm:p-7">
      <div className="texture-grid absolute inset-0 opacity-70" aria-hidden />
      <div className="relative">
        <span className="bg-accent-500 text-ink grid size-11 place-items-center rounded-xl shadow-(--shadow-accent)">
          <Icon name="pin" className="size-5" />
        </span>
        <h2 className="mt-4 text-base font-black">حضوری به ما سر بزنید</h2>
        <p className="mt-2 text-[13.5px] leading-loose text-white/70">{siteConfig.address}</p>
        <ul className="mt-5 flex flex-col gap-2.5 text-[12.5px] text-white/65">
          <li className="flex items-center gap-2">
            <Icon name="clock" className="text-accent-400 size-4 shrink-0" />
            پیش از مراجعه تماس بگیرید تا موجودی مدل موردنظرتان بررسی شود.
          </li>
          <li className="flex items-center gap-2">
            <Icon name="box" className="text-accent-400 size-4 shrink-0" />
            تحویل حضوری سفارش‌های اینترنتی هم در همین نشانی انجام می‌شود.
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={MAP_LINKS.neshan}
            target="_blank"
            rel="noopener noreferrer"
            className={`${LINK_CLASS} bg-accent-500 text-ink hover:brightness-110`}
          >
            <Icon name="pin" className="size-4" />
            مسیریابی با نشان
          </a>
          <a
            href={MAP_LINKS.google}
            target="_blank"
            rel="noopener noreferrer"
            className={`${LINK_CLASS} bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15`}
          >
            گوگل مپ
          </a>
        </div>
      </div>
    </div>
  );
}
