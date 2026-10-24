'use client';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import type { CategoryOption } from '../utils/category-tree';

type CategoryTreeItemProps = {
  node: CategoryOption;
  value: string | undefined;
  expanded: Set<string>;
  onToggle: (slug: string) => void;
  onChange: (slug: string) => void;
};

/** One category row; nodes with children get a collapse toggle and render their subtree indented. */
export function CategoryTreeItem({
  node,
  value,
  expanded,
  onToggle,
  onChange,
}: CategoryTreeItemProps) {
  const active = value === node.slug;
  const hasChildren = node.children.length > 0;
  const open = hasChildren && expanded.has(node.slug);

  return (
    <li>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => {
            onChange(node.slug);
            if (hasChildren && !open) onToggle(node.slug);
          }}
          aria-pressed={active}
          className={cn(
            'flex min-h-10 flex-1 items-center justify-between gap-2 rounded-lg px-2.5 text-[13px] transition-colors',
            active
              ? 'text-brand-600 bg-brand-50 font-bold'
              : 'text-foreground-muted hover:bg-surface-muted hover:text-foreground',
            hasChildren && !active && 'text-foreground font-semibold',
          )}
        >
          <span className="line-clamp-1 text-start">{node.title}</span>
          {active ? <Icon name="check" className="size-3.5 shrink-0" /> : null}
        </button>
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(node.slug)}
            aria-expanded={open}
            aria-label={open ? `بستن ${node.title}` : `باز کردن ${node.title}`}
            className="text-foreground-muted hover:bg-surface-muted hover:text-foreground grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg transition-colors"
          >
            <Icon
              name="chevronDown"
              className={cn('size-4 transition-transform', open && 'rotate-180')}
            />
          </button>
        ) : null}
      </div>
      {open ? (
        <ul className="border-hairline ms-2.5 mt-1 flex flex-col gap-1 border-s ps-2">
          {node.children.map((child) => (
            <CategoryTreeItem
              key={child.slug}
              node={child}
              value={value}
              expanded={expanded}
              onToggle={onToggle}
              onChange={onChange}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
