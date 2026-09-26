import Link from 'next/link';

import { Icon } from '@/components/atoms';

import { CONTACT_SHORTCUTS } from '../data/contact';

/** Self-serve links for the three things people usually call about. */
export function ContactShortcuts() {
  return (
    <section
      aria-labelledby="shortcuts-heading"
      className="border-hairline bg-surface rounded-card border p-6 shadow-(--shadow-soft)"
    >
      <h2 id="shortcuts-heading" className="text-sm font-black">
        شاید سریع‌تر به جواب برسید
      </h2>
      <p className="text-foreground-muted mt-1.5 text-[12.5px] leading-relaxed">
        این سه کار را بدون تماس، همین‌جا انجام دهید.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {CONTACT_SHORTCUTS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="hover:bg-surface-muted group flex items-center gap-3 rounded-xl p-2.5 transition-colors"
            >
              <span className="bg-brand-50 text-brand-600 group-hover:bg-brand-500 grid size-10 shrink-0 place-items-center rounded-xl transition-colors group-hover:text-white">
                <Icon name={item.icon} className="size-4.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] font-bold">{item.title}</span>
                <span className="text-foreground-muted block text-[12px]">{item.note}</span>
              </span>
              <Icon
                name="chevronEnd"
                className="text-foreground-muted size-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
