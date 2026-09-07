import { Icon } from '@/components/atoms';

export function HighlightList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="border-hairline bg-surface hover:border-brand-500/45 flex items-start gap-3 rounded-2xl border p-4 transition-colors"
        >
          <span className="bg-accent-400/15 text-brand-600 mt-0.5 grid size-7 shrink-0 place-items-center rounded-full">
            <Icon name="check" className="size-3.5" />
          </span>
          <span className="text-[14px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
