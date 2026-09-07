import type { Testimonial } from '../../types';

export function TestimonialQuote({ item }: { item: Testimonial }) {
  return (
    <figure className="flex flex-col items-center">
      <div className="text-accent-500 mb-5 text-lg tracking-[0.3em]" aria-hidden>
        {'★'.repeat(item.rating)}
      </div>
      <blockquote className="text-[1.35rem] leading-relaxed font-semibold text-balance">
        «{item.quote}»
      </blockquote>
      <figcaption className="mt-6">
        <span className="block text-base font-bold">{item.name}</span>
        <span className="mt-1 block text-sm text-white/70">{item.role}</span>
      </figcaption>
    </figure>
  );
}
