import { cn } from '@/lib/utils';

/** Decorative white blob drifting inside the orange CTA banner. */
export function AboutCtaBlob() {
  return (
    <div
      aria-hidden
      className={cn(
        'animate-blob pointer-events-none absolute -top-[110px] -left-[70px] size-[300px]',
        'rounded-full bg-white/12',
      )}
    />
  );
}
