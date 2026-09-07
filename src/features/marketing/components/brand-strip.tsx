import { Marquee } from '@/components/molecules';

import { PARTNER_BRANDS } from '../data/content';

export function BrandStrip() {
  return (
    <section className="bg-surface border-hairline border-b py-8" aria-label="برندهای همکار">
      <p className="text-foreground-muted mb-5 text-center text-[13px]">
        برندهایی که با پوما ایر همکاری دارند
      </p>
      <Marquee label="برندهای همکار" speed="slow" reverse>
        {PARTNER_BRANDS.map((brand) => (
          <span
            key={brand}
            className="border-hairline font-display text-foreground-muted mx-3 grid h-14 w-40 shrink-0 place-items-center rounded-2xl border text-[15px] font-bold"
          >
            {brand}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
