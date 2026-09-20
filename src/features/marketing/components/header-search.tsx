import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

/** GET form → `/search?q=`. Works without JS and matches the SearchAction schema. */
export function HeaderSearch({ className }: { className?: string }) {
  return (
    <form
      action={routes.search}
      method="get"
      role="search"
      className={cn(
        'bg-surface-sunken border-hairline focus-within:border-brand-400 focus-within:bg-surface focus-within:ring-brand-500/12 flex items-center gap-2.5 rounded-2xl border px-4 transition-[background-color,border-color,box-shadow] focus-within:ring-4',
        className,
      )}
    >
      <Icon name="search" className="text-brand-500 size-[17px]" />
      <input
        type="search"
        name="q"
        placeholder="جست‌وجو در ۳۵۰ مدل ابزار بادی و شارژی…"
        aria-label="جست‌وجوی محصولات"
        className="text-foreground placeholder:text-foreground-muted h-11 w-full bg-transparent text-sm outline-none"
      />
    </form>
  );
}
