/** The small rounded pill that labels each about-page section. */
export function AboutEyebrow({ children }: { children: string }) {
  return (
    <span className="bg-brand-50 text-brand-600 inline-block rounded-full px-4 py-1.5 text-xs font-extrabold">
      {children}
    </span>
  );
}
