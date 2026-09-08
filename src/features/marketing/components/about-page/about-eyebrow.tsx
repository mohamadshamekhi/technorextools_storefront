/** The small rounded pill that labels each about-page section. */
export function AboutEyebrow({ children }: { children: string }) {
  return (
    <span className="bg-brand-50 text-brand-600 ring-brand-100 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-extrabold ring-1">
      <span className="bg-accent-500 size-1.5 rounded-full" aria-hidden />
      {children}
    </span>
  );
}
