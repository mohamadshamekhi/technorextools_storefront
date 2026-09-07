'use client';

import { useEffect, useState } from 'react';

import { Container } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { SECTION } from '../../anchors';
import { TESTIMONIALS } from '../../data/content';
import { TestimonialQuote } from './testimonial-quote';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index] ?? TESTIMONIALS[0];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id={SECTION.voices} aria-labelledby="voices-heading" className="bg-ink scroll-mt-24 py-24 text-white">
      <Container className="mx-auto max-w-2xl text-center">
        <span className="font-display text-accent-500 text-xs tracking-[0.2em]">CUSTOMERS</span>
        <h2 id="voices-heading" className="mt-3 mb-10 text-[2.1rem] font-black tracking-tight">
          حرف حساب از زبان کاربران
        </h2>
        {active ? <TestimonialQuote item={active} /> : null}
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
