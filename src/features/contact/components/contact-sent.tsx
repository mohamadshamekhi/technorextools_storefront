import { Icon } from '@/components/atoms';

/** Confirmation shown in place of the form after a successful submit. */
export function ContactSent() {
  return (
    <div className="border-hairline bg-surface rounded-card border p-10 text-center shadow-(--shadow-lift)">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-[oklch(0.95_0.04_155)] text-[oklch(0.45_0.13_155)]">
        <Icon name="check" className="size-8" />
      </span>
      <h2 className="mt-5 text-lg font-black">پیام شما ارسال شد</h2>
      <p className="text-foreground-muted mt-2 text-sm">
        همکاران ما به‌زودی با شما تماس خواهند گرفت.
      </p>
    </div>
  );
}
