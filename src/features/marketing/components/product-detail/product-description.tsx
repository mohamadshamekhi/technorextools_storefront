import { HighlightList } from './highlight-list';

type ProductDescriptionProps = {
  description: string;
  highlights: string[];
};

export function ProductDescription({ description, highlights }: ProductDescriptionProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="border-hairline bg-surface relative rounded-2xl border p-7 text-[15px] leading-loose">
        <span
          aria-hidden
          className="font-display text-brand-100 absolute end-6 top-4 text-4xl leading-none"
        >
          &rdquo;
        </span>
        <p>{description}</p>
        <p className="mt-4">
          طراحی این ابزار برای کار مستمر در محیط‌های صنعتی بهینه شده است؛ ترکیب گشتاور بالا با وزن
          کنترل‌شده باعث می‌شود خستگی اپراتور در شیفت‌های طولانی کاهش پیدا کند و دقت پیچ‌کاری روی
          قطعات حساس حفظ شود.
        </p>
      </div>
      <HighlightList items={highlights} />
    </div>
  );
}
