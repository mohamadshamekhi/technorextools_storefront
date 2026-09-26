import { Container, Icon } from '@/components/atoms';
import { Reveal } from '@/components/molecules';

import { listBundles } from '../../services/catalog.api';
import { BundleBand } from './bundle-band';

/** Homepage package offers. Renders nothing when the catalog has no active bundle. */
export async function BundleRail() {
  const bundles = await listBundles().catch(() => null);
  if (!bundles || bundles.length === 0) return null;

  return (
    <Container as="section" aria-labelledby="bundles-heading" className="scroll-mt-24 py-16">
      <div className="mb-6 max-w-xl">
        <span className="text-brand-600 flex items-center gap-1.5 text-[11.5px] font-black tracking-[0.18em] uppercase">
          <Icon name="cube" className="size-3.5" />
          packages
        </span>
        <h2 id="bundles-heading" className="mt-1.5 text-2xl font-black tracking-tight sm:text-3xl">
          پکیج‌های اقتصادی
        </h2>
        <p className="text-foreground-muted mt-2 text-[13.5px] leading-7">
          ست‌های آماده‌ی ابزار برای شروع کار — همان کالاهای اصلی، با قیمتی کمتر از خرید تکی.
        </p>
      </div>

      <Reveal className="flex flex-col gap-5">
        {bundles.map((bundle) => (
          <BundleBand key={bundle.id} bundle={bundle} />
        ))}
      </Reveal>
    </Container>
  );
}
