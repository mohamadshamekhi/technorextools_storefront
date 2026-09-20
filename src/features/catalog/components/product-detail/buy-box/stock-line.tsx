import { cn } from '@/lib/utils';

export function StockLine({ inStock }: { inStock: boolean }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-sm font-bold',
        inStock ? 'text-[#15803D]' : 'text-foreground-muted',
      )}
    >
      <span
        aria-hidden
        className={cn('size-2 rounded-full', inStock ? 'bg-success' : 'bg-foreground-muted')}
      />
      {inStock ? 'موجود · ارسال امروز از تهران' : 'ناموجود'}
    </p>
  );
}
