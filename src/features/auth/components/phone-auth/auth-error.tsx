import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

type AuthErrorProps = { message: string; align?: 'start' | 'center' };

/** Inline validation message with a warning icon. Renders nothing when empty. */
export function AuthError({ message, align = 'start' }: AuthErrorProps) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className={cn(
        'text-sale mt-2.5 flex items-center gap-1.5 text-[12.5px]',
        align === 'center' && 'justify-center',
      )}
    >
      <Icon name="alert" className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}
