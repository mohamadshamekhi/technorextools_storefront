import { AboutEyebrow } from './about-eyebrow';

type AboutSectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Anchors `aria-labelledby` from the parent section. */
  id: string;
  className?: string;
};

/** Centered pill + headline pair shared by the about-page sections. */
export function AboutSectionHeading({ eyebrow, title, id, className }: AboutSectionHeadingProps) {
  return (
    <div className={className ?? 'mb-12 text-center'}>
      <AboutEyebrow>{eyebrow}</AboutEyebrow>
      <h2 id={id} className="mt-4 text-[1.75rem] font-black tracking-tight text-balance">
        {title}
      </h2>
    </div>
  );
}
