import { Icon } from '@/components/atoms';

/** Placeholder tile filling out a sparse grid — signals more inventory is on the way. */
export function ComingSoonCard() {
  return (
    <div className="border-hairline text-foreground-muted flex h-full min-h-88 flex-col items-center justify-center gap-3 rounded-card border-2 border-dashed p-6 text-center">
      <span className="bg-surface-sunken grid size-12 place-items-center rounded-2xl">
        <Icon name="clock" className="size-6" />
      </span>
      <p className="text-foreground text-sm font-bold">به‌زودی محصولات بیشتر</p>
      <p className="max-w-56 text-[12.5px] leading-relaxed">
        کاتالوگ تکنورکس هر هفته به‌روزرسانی می‌شود.
      </p>
    </div>
  );
}
