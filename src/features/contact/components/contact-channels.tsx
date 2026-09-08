import { Container, Icon } from '@/components/atoms';

import { CONTACT_CHANNELS } from '../data/contact';

const CARD_CLASS =
  'border-hairline bg-surface group rounded-card border p-6 text-center shadow-(--shadow-soft) transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-(--shadow-lift)';

/** Four quick-contact cards. Server-rendered; links where a channel has an href. */
export function ContactChannels() {
  return (
    <Container className="grid gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-4">
      {CONTACT_CHANNELS.map((channel) => {
        const body = (
          <>
            <span className="bg-brand-50 text-brand-600 ring-brand-100 mx-auto grid size-12 place-items-center rounded-xl ring-1 transition-colors group-hover:bg-brand-500 group-hover:text-white">
              <Icon name={channel.icon} className="size-5" />
            </span>
            <p className="mt-4 text-[13px] font-bold">{channel.title}</p>
            <p className="text-foreground-muted mt-1 text-[13px]" dir="ltr">
              {channel.value}
            </p>
          </>
        );

        return channel.href ? (
          <a key={channel.title} href={channel.href} className={CARD_CLASS}>
            {body}
          </a>
        ) : (
          <div key={channel.title} className={CARD_CLASS}>
            {body}
          </div>
        );
      })}
    </Container>
  );
}
