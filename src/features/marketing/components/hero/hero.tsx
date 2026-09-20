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
        <Reveal className="flex flex-col gap-6">
          <span id="hero-heading" className="sr-only">
            تکنورکس؛ فروش ابزار بادی و شارژی صنعتی
          </span>
          <HeroBadge />
          <HeroHeadline />
          <p className="text-foreground-muted max-w-xl text-[17px] leading-relaxed">
            پیچ‌گوشتی، دریل، بکس و چکش بادی و شارژی — گارانتی اصالت، قطعات یدکی همیشه موجود و
            مشاورهٔ فنی رایگان پیش از خرید.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <PillLink href={routes.products} size="lg">
              <Icon name="cart" className="size-[18px]" />
              مشاهدهٔ محصولات
            </PillLink>
            <PillLink href={routes.contact} size="lg" variant="outline">
              <Icon name="headset" className="text-brand-600 size-[18px]" />
              مشاورهٔ رایگان خرید
            </PillLink>
          </div>
          <HeroStats />
        </Reveal>
        <Reveal>
          <HeroShowcase product={featuredProduct} />
        </Reveal>
      </Container>
    </section>
  );
}
