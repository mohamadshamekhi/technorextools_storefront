import { Container, Icon, PillLink } from '@/components/atoms';
import { Reveal } from '@/components/molecules';
import { routes } from '@/config/routes';
import type { ProductDetail } from '@/features/catalog';

import { HeroBadge } from './hero-badge';
import { HeroHeadline } from './hero-headline';
import { HeroShowcase } from './hero-showcase';
import { HeroStats } from './hero-stats';
import styles from './hero.module.css';

type HeroProps = {
  /** `isFeatured` product to spotlight; `null` shows the static fallback art. */
  featuredProduct: ProductDetail | null;
};

export function Hero({ featuredProduct }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden py-16 [background:radial-gradient(120%_120%_at_85%_-10%,var(--color-brand-50)_0%,transparent_55%)] sm:py-24 lg:py-28"
      aria-labelledby="hero-heading"
    >
      <span className={styles.blobWarm} aria-hidden />
      <span className={styles.blobCool} aria-hidden />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <span id="hero-heading" className="sr-only">
            تکنورکس؛ فروش ابزار بادی و شارژی صنعتی
          </span>
          <Reveal delayMs={0}>
            <HeroBadge />
          </Reveal>
          <Reveal delayMs={90}>
            <HeroHeadline />
          </Reveal>
          <Reveal
            as="p"
            delayMs={180}
            className="text-foreground-muted max-w-xl text-[17px] leading-relaxed"
          >
            پیچ‌گوشتی، دریل، بکس و چکش بادی و شارژی — گارانتی اصالت، قطعات یدکی همیشه موجود و
            مشاورهٔ فنی رایگان پیش از خرید.
          </Reveal>
          <Reveal delayMs={270} className="flex gap-2.5 sm:gap-3.5">
            <PillLink
              href={routes.products}
              size="lg"
              className="flex-1 gap-1.5 px-4 py-3 text-[13px] sm:flex-initial sm:gap-2.5 sm:px-8 sm:py-4 sm:text-base"
            >
              <Icon name="cart" className="size-4 sm:size-[18px]" />
              مشاهدهٔ محصولات
            </PillLink>
            <PillLink
              href={routes.contact}
              size="lg"
              variant="outline"
              className="flex-1 gap-1.5 px-4 py-3 text-[13px] sm:flex-initial sm:gap-2.5 sm:px-8 sm:py-4 sm:text-base"
            >
              <Icon name="headset" className="text-brand-600 size-4 sm:size-[18px]" />
              مشاورهٔ رایگان خرید
            </PillLink>
          </Reveal>
          <Reveal delayMs={360}>
            <HeroStats />
          </Reveal>
        </div>
        <Reveal delayMs={150}>
          <HeroShowcase product={featuredProduct} />
        </Reveal>
      </Container>
    </section>
  );
}
