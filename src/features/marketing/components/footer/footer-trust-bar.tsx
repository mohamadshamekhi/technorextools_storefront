import { Icon } from '@/components/atoms';

import { TRUST_BADGES } from '../../data/content';

export function FooterTrustBar() {
  return (
    <ul className="grid gap-4 pb-11 sm:grid-cols-2 lg:grid-cols-4">
      {TRUST_BADGES.map((badge) => (
        <li
          key={badge.title}
          className="flex items-center gap-3.5 rounded-2xl bg-white/6 px-5 py-4 ring-1 ring-white/10 transition-colors hover:bg-white/10"
        >
          <span className="text-accent-500 grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
            <Icon name={badge.icon} className="size-5" />
          </span>
          <div>
            <div className="text-sm font-bold text-white">{badge.title}</div>
            <div className="text-[12px] text-white/65">{badge.description}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
