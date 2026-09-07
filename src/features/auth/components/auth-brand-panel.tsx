import { BrandLogo } from '@/components/molecules';
import { Icon } from '@/components/atoms';
import { siteConfig } from '@/config/site';

import { AUTH_PANEL_COPY, AUTH_TRUST_POINTS } from '../data/auth-content';
import styles from './auth-brand-panel.module.css';

/** Dark storytelling half of the auth split screen (RSC — zero client JS). */
export function AuthBrandPanel() {
  return (
    <aside className="bg-ink text-surface relative hidden flex-col justify-between overflow-hidden p-14 lg:flex">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_20%_0%,oklch(0.32_0.09_45_/_0.35)_0%,transparent_60%)]"
      />
      <span aria-hidden className={styles.ring} />
      <span aria-hidden className={styles.blob} />

      <BrandLogo tone="dark" className="relative z-10" />

      <div className="relative z-10">
        <span
          className={`bg-accent-400/15 text-accent-400 border-accent-400/25 mb-7 flex size-16 items-center justify-center rounded-3xl border ${styles.float}`}
        >
          <Icon name="shield" className="size-7" />
        </span>
        <h2 className="max-w-md text-[1.9rem] leading-relaxed font-black tracking-tight">
          {AUTH_PANEL_COPY.heading}
        </h2>
        <p className="text-surface/60 mt-4 max-w-md text-[15px] leading-loose">
          {AUTH_PANEL_COPY.body}
        </p>

        <ul className="mt-9 flex flex-col gap-4">
          {AUTH_TRUST_POINTS.map((point) => (
            <li key={point.label} className="flex items-center gap-3.5">
              <span className="border-surface/12 bg-surface/5 text-accent-400 flex size-9 items-center justify-center rounded-xl border">
                <Icon name={point.icon} className="size-4" />
              </span>
              <span className="text-surface/75 text-[13.5px]">{point.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-surface/40 relative z-10 text-[12px]">
        © تمامی حقوق برای {siteConfig.name} محفوظ است.
      </p>
    </aside>
  );
}
