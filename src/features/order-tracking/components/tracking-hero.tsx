import { Container, Icon } from '@/components/atoms';

import { TrackingForm } from './tracking-form';

type Props = {
  error: string | null;
  onSubmit: (values: { code: string; mobile: string }) => void;
};

/** Page opener: icon badge, headline, lookup form and demo hint. */
export function TrackingHero({ error, onSubmit }: Props) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <Container className="relative max-w-xl text-center">
        <span className="bg-brand-50 text-brand-600 mx-auto grid size-14 place-items-center rounded-2xl">
          <Icon name="truck" className="size-7" />
        </span>
        <h1 className="mt-5 mb-3 text-3xl font-black tracking-tight">پیگیری سفارش</h1>
        <p className="text-foreground-muted text-sm leading-loose text-pretty">
          کد سفارش و شماره موبایل خود را وارد کنید تا وضعیت ارسال را ببینید.
        </p>

        <TrackingForm error={error} onSubmit={onSubmit} />

        <p className="text-foreground-muted mt-5 text-xs">
          برای دمو: کد <span className="text-foreground font-bold">PA-249672</span> با شماره{' '}
          <span className="text-foreground font-bold">۰۹۱۲۱۲۳۴۵۶۷</span>
        </p>
      </Container>
    </section>
  );
}
