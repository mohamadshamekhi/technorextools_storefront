import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { categoryPresentation, type CategoryNode } from '@/features/catalog';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  /** Parent node this column is the children of — its thumbnail is shown as a header chip. */
  headerNode?: CategoryNode;
  items: CategoryNode[];
  activeId: string | null;
  onHoverItem: (node: CategoryNode) => void;
  onBack?: () => void;
  withIcons?: boolean;
  viewAllHref?: string;
  divider?: boolean;
  onNavigate: () => void;
  /** Overrides the default fixed-width desktop flyout sizing — e.g. `w-full` in the mobile bottom sheet. */
  className?: string;
};

/** One flyout column: titled list of category nodes, optional back control, image/icon chips and a "view all" link. */
export function CategoryMegaMenuColumn({
  title,
  headerNode,
  items,
  activeId,
  onHoverItem,
  onBack,
  withIcons,
  viewAllHref,
  divider,
  onNavigate,
  className,
}: Props) {
  const headerStyle = headerNode ? categoryPresentation(headerNode.slug) : null;

  return (
    <div
      className={cn(
        'flex w-80 shrink-0 flex-col',
        divider && 'border-hairline border-e',
        className,
      )}
    >
      <div className="border-hairline flex items-center gap-2 border-b px-5 py-4 text-base font-bold">
        {/* {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="بازگشت"
            className="text-foreground-muted hover:text-brand-700 hover:bg-brand-50 -ms-1.5 grid size-7 shrink-0 place-items-center rounded-full"
          >
            <Icon name="chevron" className="size-4.5 rotate-180" />
          </button>
        ) : null} */}
        <span className="truncate">{title}</span>
        {headerStyle ? (
          headerNode?.imageUrl ? (
            <span className="bg-surface-muted relative ms-auto size-6 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={headerNode.imageUrl}
                alt=""
                fill
                sizes="32px"
                className="object-contain p-1"
              />
            </span>
          ) : (
            <span
              className="ms-auto grid size-8 shrink-0 place-items-center rounded-lg"
              style={{ backgroundColor: headerStyle.tint, color: headerStyle.ink }}
            >
              <Icon name={headerStyle.icon} className="size-3.5" />
            </span>
          )
        ) : null}
      </div>
      <ul role="menu" className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {items.map((item) => {
          const style = withIcons ? categoryPresentation(item.slug) : null;
          return (
            <li key={item.id} role="none">
              <Link
                href={routes.category(item.slug)}
                role="menuitem"
                onMouseEnter={() => onHoverItem(item)}
                onFocus={() => onHoverItem(item)}
                onClick={onNavigate}
                className={cn(
                  'hover:bg-brand-50 hover:text-brand-700 flex items-center gap-3 rounded-xl px-2 py-3 text-[15px] font-semibold transition-colors',
                  activeId === item.id && 'bg-brand-50 text-brand-700',
                )}
              >
                {style ? (
                  item.imageUrl ? (
                    <span className="bg-surface-muted relative size-9 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.imageUrl}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-contain p-1"
                      />
                    </span>
                  ) : (
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-lg"
                      style={{ backgroundColor: style.tint, color: style.ink }}
                    >
                      <Icon name={style.icon} className="size-4" />
                    </span>
                  )
                ) : null}
                <span className="flex-1 truncate">{item.title}</span>
                <Icon name="chevron" className="text-foreground-muted size-4 shrink-0" />
              </Link>
            </li>
          );
        })}
      </ul>
      {viewAllHref ? (
        <Link
          href={viewAllHref}
          onClick={onNavigate}
          className="text-brand-700 hover:bg-brand-50 border-hairline mx-3 mb-2 flex items-center justify-center gap-1 rounded-xl border-t px-3 py-3.5 text-[15px] font-bold"
        >
          مشاهده همه
          <Icon name="chevron" className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
