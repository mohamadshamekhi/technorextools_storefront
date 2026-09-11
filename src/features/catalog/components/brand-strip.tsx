import { Marquee } from '@/components/molecules';

import { listBrands } from '../services/catalog.api';

export async function BrandStrip() {
  const brands = await listBrands().catch(() => []);
  if (brands.length === 0) return null;

  return (
    <section className="bg-surface border-hairline border-b py-8" aria-label="برندهای همکار">
      <p className="text-foreground-muted mb-5 text-center text-[13px]">
        برندهایی که با پوما ایر همکاری دارند
      </p>
      <Marquee label="برندهای همکار" speed="slow" reverse>
        {brands.map((brand) => (
          <span
            key={brand.id}
            className="border-hairline bg-surface font-display text-foreground-muted hover:text-brand-600 mx-3 grid h-14 w-40 shrink-0 place-items-center rounded-2xl border text-[15px] font-bold shadow-(--shadow-soft) transition-colors"
          >
            {brand.title}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
