import { cn } from '@/lib/utils';

type AuthProgressProps = { total: number; current: number };

/** Row of step pills; the current step is widened and brand-coloured. */
export function AuthProgress({ total, current }: AuthProgressProps) {
  return (
    <div className="mb-9 flex items-center justify-center gap-2" aria-hidden>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            index === current ? 'bg-brand-500 w-7' : 'w-2.5',
            index < current ? 'bg-brand-500' : index > current && 'bg-hairline',
          )}
        />
      ))}
    </div>
  );
}
