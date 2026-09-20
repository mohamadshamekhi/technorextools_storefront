import { Icon } from '@/components/atoms';

import { SOCIAL_LINKS } from '../../data/navigation';

export function FooterSocialLinks() {
  return (
    <div className="flex gap-2.5">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          rel="noopener noreferrer"
          target="_blank"
          className="hover:border-accent-500 hover:text-accent-500 grid size-10 place-items-center rounded-xl border border-white/15 text-white/80 transition-colors hover:bg-white/5"
        >
          <Icon name={social.icon} className="size-[19px]" />
        </a>
      ))}
    </div>
  );
}
