import { Icon } from '@/components/atoms';
import { BrandLogo } from '@/components/molecules';

export function CheckoutTopbar() {
  return (
    <header className="border-hairline bg-surface/95 sticky top-0 z-40 border-b backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <BrandLogo />
        <div className="text-foreground-muted flex items-center gap-2 text-[12.5px]">
          <span className="size-1.5 rounded-full bg-[oklch(0.5_0.14_155)] animate-[auth-pulse_1.8s_ease-in-out_infinite]" />
          <Icon name="lock" className="size-3.5 text-[oklch(0.5_0.14_155)]" />
          <span className="hidden sm:inline">پرداخت امن و رمزنگاری‌شده</span>
        </div>
      </div>
    </header>
  );
}
