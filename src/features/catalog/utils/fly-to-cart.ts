const FLIGHT_MS = 650;

/** Arcs a thumbnail clone from `source` to the header cart icon (`[data-cart-target]`). */
export function flyToCart(source: Element, imageUrl?: string | null): void {
  const target = document.querySelector('[data-cart-target]');
  if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  const chip = document.createElement('div');
  chip.setAttribute('aria-hidden', 'true');
  chip.className =
    'pointer-events-none fixed z-[80] size-14 rounded-xl bg-white bg-cover bg-center shadow-xl ring-1 ring-black/10';
  chip.style.left = `${from.left + from.width / 2 - 28}px`;
  chip.style.top = `${from.top + from.height / 2 - 28}px`;
  if (imageUrl) chip.style.backgroundImage = `url("${imageUrl}")`;
  document.body.appendChild(chip);

  const animation = chip.animate(
    [
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      {
        transform: `translate(${dx * 0.5}px,${dy * 0.5 - 90}px) scale(0.7)`,
        opacity: 1,
        offset: 0.5,
      },
      { transform: `translate(${dx}px,${dy}px) scale(0.2)`, opacity: 0.4 },
    ],
    { duration: FLIGHT_MS, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  );
  animation.onfinish = () => chip.remove();
}
