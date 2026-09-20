'use client';

import { useEffect, useState } from 'react';

import { Container, Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { SECTION } from '../../anchors';
import { TESTIMONIALS } from '../../data/content';
import { TestimonialQuote } from './testimonial-quote';

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = TESTIMONIALS[index] ?? TESTIMONIALS[0];
  const count = TESTIMONIALS.length;

  const go = (next: number) => setIndex((next + count) % count);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section
      id={SECTION.voices}
      aria-labelledby="voices-heading"
      className="surface-ink texture-grid scroll-mt-24 py-20 text-white lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Container className="relative mx-auto text-center">
        <span className="font-display text-accent-500 inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold tracking-[0.2em]">
          CUSTOMERS
        </span>
        <h2 id="voices-heading" className="mt-3 mb-10 text-[2.1rem] font-black tracking-tight">
          حرف حساب از زبان کاربران
        </h2>
        <div className="relative mx-auto flex max-w-2xl items-center gap-3 sm:gap-5">
          <button
            type="button"
            aria-label="نظر قبلی"
            onClick={() => go(index - 1)}
            className="border-hairline hover:bg-accent-500 hover:text-ink hover:border-accent-500 flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors"
          >
            <Icon name="chevronEnd" className="size-5 rotate-180" />
          </button>
          <div key={active?.name} className="animate-carousel-in min-w-0 flex-1" aria-live="polite">
            {active ? <TestimonialQuote item={active} /> : null}
          </div>
          <button
            type="button"
            aria-label="نظر بعدی"
            onClick={() => go(index + 1)}
            className="border-hairline hover:bg-accent-500 hover:text-ink hover:border-accent-500 flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors"
          >
            <Icon name="chevronEnd" className="size-5" />
          </button>
        </div>
        <div className="mt-8 flex justify-center gap-2.5" role="tablist" aria-label="انتخاب نظر">
          {TESTIMONIALS.map((item, dot) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={dot === index}
              aria-label={`نظر ${item.name}`}
              onClick={() => setIndex(dot)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                dot === index ? 'bg-accent-500 w-8' : 'w-4 bg-white/30',
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
