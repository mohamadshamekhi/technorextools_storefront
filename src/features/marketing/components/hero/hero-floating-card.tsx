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
        'bg-surface absolute flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-xl',
        className,
      )}
    >
      <Icon name={icon} className={cn('size-5', accent)} />
      <div>
        <div className={cn('font-display text-lg font-bold', accent)}>{value}</div>
        <div className="text-foreground-muted text-xs">{label}</div>
      </div>
    </div>
  );
}
