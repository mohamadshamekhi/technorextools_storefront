import { Container } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import { PROMO_CARDS } from '../../data/content';
import { PromoCard } from './promo-card';

export function PromoCards() {
  return (
    <Container as="section" aria-label="پیشنهادهای ویژه" className="pt-7">
      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {PROMO_CARDS.map((promo, index) => (
          <Reveal key={promo.title} delayMs={index * 60}>
            <PromoCard promo={promo} index={index} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
