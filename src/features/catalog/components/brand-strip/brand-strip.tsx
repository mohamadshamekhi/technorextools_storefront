import Link from 'next/link';

import { Container } from '@/components/atoms';
import { Marquee, Reveal, SectionHeading } from '@/components/molecules';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

import { listBrands } from '../../services/catalog.api';
import { BrandTile } from './brand-tile';
import styles from './brand-strip.module.css';

/** Below this count a marquee leaves dead space — render a centered row instead. */
const MARQUEE_THRESHOLD = 7;

export async function BrandStrip() {
  const brands = await listBrands().catch(() => []);
  if (brands.length === 0) return null;

  const exclusiveCount = brands.filter((brand) => brand.isExclusiveDistributor).length;
  const scrolls = brands.length >= MARQUEE_THRESHOLD;

  return (
    <section
      aria-labelledby="brands-heading"
      className={cn('bg-surface border-hairline relative overflow-hidden border-y', styles.canvas)}
    >
      <Container className="relative py-14 sm:py-16">
        <SectionHeading
          id="brands-heading"
          eyebrow="Partners"
          align="center"
          title="برندهایی که با تکنورکس همکاری می‌کنند"
          className="mx-auto max-w-2xl"
        />
        <p className="text-foreground-muted mx-auto mt-4 max-w-xl text-center text-sm leading-7">
          {exclusiveCount > 0
            ? `تأمین مستقیم از ${brands.length} برند صنعتی — ${exclusiveCount} مورد با نمایندگی رسمی و گارانتی اصالت کالا.`
            : `تأمین مستقیم از ${brands.length} برند صنعتی، با گارانتی اصالت کالا و خدمات پس از فروش.`}
        </p>

        <div className={cn('mt-10', scrolls && styles.fade)}>
          {scrolls ? (
            <Marquee label="برندهای همکار" speed="slow" reverse>
              {brands.map((brand) => (
                <div key={brand.id} className="px-2.5">
                  <BrandTile brand={brand} />
                </div>
              ))}
            </Marquee>
          ) : (
            <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Reveal>
                    <BrandTile brand={brand} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={routes.products}
            className="border-hairline bg-surface text-foreground hover:border-brand-300 hover:text-brand-600 inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-bold shadow-(--shadow-soft) transition-colors"
          >
            مشاهده محصولات همه برندها
            <span aria-hidden>←</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
