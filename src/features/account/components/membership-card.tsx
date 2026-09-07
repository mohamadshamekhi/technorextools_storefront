import { Icon } from '@/components/atoms';
import { toPersianDigits } from '@/lib/persian';

import { MEMBERSHIP } from '../data/overview';

export function MembershipCard() {
  return (
    <div className="bg-ink flex flex-col justify-between rounded-2xl p-5 text-white">
      <div>
        <p className="text-[12.5px] text-white/70">سطح عضویت</p>
        <p className="mt-1 mb-3.5 text-[19px] font-black">{MEMBERSHIP.tier}</p>
        <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div className="bg-accent-400 h-full" style={{ width: `${MEMBERSHIP.progress}%` }} />
        </div>
        <p className="text-[11.5px] text-white/70">
          {toPersianDigits(MEMBERSHIP.toNextLabel)}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11.5px] text-white/75">
        <Icon name="gift" className="text-accent-400 size-3.5" />
        {toPersianDigits(MEMBERSHIP.perk)}
      </div>
    </div>
  );
}
