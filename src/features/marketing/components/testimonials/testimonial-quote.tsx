import type { Testimonial } from '../../types';

function initials(name: string) {
  return name.trim().slice(0, 1);
}

export function TestimonialQuote({ item }: { item: Testimonial }) {
  return (
    <figure className="rounded-[2rem] bg-white/6 p-8 shadow-(--shadow-float) ring-1 ring-white/10 sm:p-10">
      <span
        className="font-display text-accent-500/40 block text-6xl leading-none font-black"
        aria-hidden
      >
        “
      </span>
      <div className="text-accent-500 -mt-2 mb-5 text-lg tracking-[0.3em]" aria-hidden>
        {'★'.repeat(item.rating)}
      </div>
      <blockquote className="text-[1.35rem] leading-relaxed font-semibold text-balance">
        «{item.quote}»
      </blockquote>
      <figcaption className="mt-7 flex items-center justify-center gap-3.5">
        <span className="font-display text-ink grid size-11 shrink-0 place-items-center rounded-full bg-(image:--gradient-spark) text-base font-black">
          {initials(item.name)}
        </span>
        <span className="text-start">
          <span className="block text-base font-bold">{item.name}</span>
          <span className="mt-0.5 block text-sm text-white/70">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
