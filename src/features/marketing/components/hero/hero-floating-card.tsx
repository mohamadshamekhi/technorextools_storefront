import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

type HeroFloatingCardProps = {
  value: string;
  label: string;
  accent: string;
  badgeSide: 'start' | 'end';
  className?: string;
};

/** Premium spec chip that hovers over the hero art, badge-pinned to the leading or trailing corner. */
export function HeroFloatingCard({
  value,
  label,
  accent,
  badgeSide,
  className,
}: HeroFloatingCardProps) {
  return (
    <div
      className={cn(
        'bg-surface/90 ring-hairline absolute flex flex-col gap-0.5 rounded-2xl px-4 py-2.5 shadow-(--shadow-float) ring-1 backdrop-blur-md',
        className,
      )}
    >
      <span
        className={cn(
          'bg-surface ring-hairline absolute -top-2 grid size-6 place-items-center rounded-full shadow-(--shadow-float) ring-1',
          badgeSide === 'start' ? '-inset-s-2' : '-inset-e-2',
          accent,
        )}
        aria-hidden
      >
        <Icon name="check" className="size-3.5" />
      </span>
      <span className={cn('font-display text-base leading-tight font-extrabold', accent)}>
        {value}
      </span>
      <span className="text-foreground-muted text-[11px] leading-tight whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
