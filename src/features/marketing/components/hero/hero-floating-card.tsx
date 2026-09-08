import { Icon, type IconName } from '@/components/atoms';
import { cn } from '@/lib/utils';

type HeroFloatingCardProps = {
  icon: IconName;
  value: string;
  label: string;
  accent: string;
  className?: string;
};

/** Small stat chip that hovers over the hero art. */
export function HeroFloatingCard({ icon, value, label, accent, className }: HeroFloatingCardProps) {
  return (
    <div
      className={cn(
        'bg-surface absolute flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-(--shadow-float) ring-1 ring-hairline',
        className,
      )}
    >
      <span className={cn('bg-surface-sunken grid size-9 place-items-center rounded-xl', accent)}>
        <Icon name={icon} className="size-5" />
      </span>
      <div>
        <div className={cn('font-display text-lg font-bold', accent)}>{value}</div>
        <div className="text-foreground-muted text-xs">{label}</div>
      </div>
    </div>
  );
}
