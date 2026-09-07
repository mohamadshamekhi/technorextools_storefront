import { Container } from '@/components/atoms';

import { VALUE_PROPS } from '../../data/content';
import { ValueProp } from './value-prop';

export function ValueProps() {
  return (
    <section className="bg-surface border-hairline border-b" aria-label="مزیت‌های خرید">
      <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {VALUE_PROPS.map((item) => (
          <ValueProp key={item.title} item={item} />
        ))}
      </Container>
    </section>
  );
}
