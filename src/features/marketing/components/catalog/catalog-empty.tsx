import { Icon } from '@/components/atoms';

export function CatalogEmpty({ onReset }: { onReset: () => void }) {
  return (
    <div className="border-hairline bg-surface rounded-card flex flex-col items-center gap-4 border border-dashed py-16 text-center">
      <Icon name="box" className="text-foreground-muted size-8" />
      <p className="font-bold">محصولی با این فیلترها پیدا نشد</p>
      <p className="text-foreground-muted text-sm">فیلترها را ساده‌تر کنید تا نتیجه بیشتری ببینید.</p>
      <button
        type="button"
        onClick={onReset}
        className="bg-brand-500 hover:bg-brand-600 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors"
      >
        حذف همه فیلترها
      </button>
    </div>
  );
}
