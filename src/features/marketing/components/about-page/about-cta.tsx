import Link from 'next/link';

import { Container } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

import { AboutCtaBlob } from './about-cta-blob';

/** Wholesale-consultation banner closing the about page. */
export function AboutCta() {
  return (
    <section className="pb-24">
      <Container>
        <Reveal>
          <div
            className={cn(
              'bg-brand-500 relative flex flex-wrap items-center justify-between gap-10 overflow-hidden',
              'rounded-[2rem] p-10 text-white lg:p-14',
            )}
          >
            <AboutCtaBlob />
            <div className="relative">
              <h2 className="mb-2.5 text-2xl font-black tracking-tight">
                آماده همکاری با شما هستیم
              </h2>
              <p className="m-0 text-[14.5px] text-white/85">
                برای مشاوره خرید یا سفارش عمده کارگاهی با ما در ارتباط باشید.
              </p>
            </div>
            <Link
              href={routes.contact}
              className="bg-ink relative inline-flex shrink-0 items-center rounded-full px-8 py-4 text-[14.5px] font-bold whitespace-nowrap text-white transition-colors hover:bg-black"
            >
              تماس با ما
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
