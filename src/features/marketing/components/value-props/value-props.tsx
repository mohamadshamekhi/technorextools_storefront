import { Container } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import { VALUE_PROPS } from '../../data/content';
import { ValueProp } from './value-prop';

export function ValueProps() {
  return (
    <section className="bg-surface-muted" aria-label="مزیت‌های خرید">
      <Container className="grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {VALUE_PROPS.map((item) => (
          <Reveal key={item.title}>
            <ValueProp item={item} />
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
