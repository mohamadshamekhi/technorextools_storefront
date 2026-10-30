'use client';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { categoryPresentation } from '../data/presentation';
import type { CategoryOption } from '../utils/category-tree';

type CategoryTreeItemProps = {
  node: CategoryOption;
  value: string | undefined;
  expanded: Set<string>;
  onToggle: (slug: string) => void;
  onChange: (slug: string) => void;
  depth?: number;
};

/** One category row; top-level rows carry the department icon, children render as an indented subtree. */
export function CategoryTreeItem({
  node,
  value,
  expanded,
  onToggle,
  onChange,
  depth = 0,
}: CategoryTreeItemProps) {
  const active = value === node.slug;
  const hasChildren = node.children.length > 0;
  const open = hasChildren && expanded.has(node.slug);
  const look = depth === 0 ? categoryPresentation(node.slug) : null;

  return (
    <li>
      <div
        className={cn(
          'group relative flex items-center gap-1 rounded-xl transition-colors',
          active ? 'bg-brand-50' : 'hover:bg-surface-muted',
        )}
      >
        {active ? (
          <span className="bg-brand-500 absolute inset-y-2 start-0 w-1 rounded-full" />
        ) : null}
        <button
          type="button"
          onClick={() => {
            onChange(node.slug);
            if (hasChildren && !open) onToggle(node.slug);
          }}
          aria-pressed={active}
          className={cn(
            'flex min-h-10 flex-1 cursor-pointer items-center gap-2.5 ps-2.5 text-start text-[13px] transition-colors',
            active
              ? 'text-brand-700 font-bold'
              : 'text-foreground-muted group-hover:text-foreground',
            look && !active && 'text-foreground font-semibold',
          )}
        >
          {look ? (
            <span
              className="grid size-7 shrink-0 place-items-center rounded-lg"
              style={{ backgroundColor: look.tint, color: look.ink }}
            >
              <Icon name={look.icon} className="size-3.5" />
            </span>
          ) : (
            <span
              className={cn(
                'size-1.5 shrink-0 rounded-full',
                active ? 'bg-brand-500' : 'bg-hairline group-hover:bg-foreground-muted',
              )}
            />
          )}
          <span className="line-clamp-1">{node.title}</span>
        </button>
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(node.slug)}
            aria-expanded={open}
            aria-label={open ? `بستن ${node.title}` : `باز کردن ${node.title}`}
            className="text-foreground-muted hover:text-foreground grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg transition-colors"
          >
            <Icon
              name="chevronDown"
              className={cn('size-4 transition-transform duration-300', open && 'rotate-180')}
            />
          </button>
        ) : null}
      </div>
      {open ? (
        <ul className="border-hairline animate-fade-in ms-5 mt-1 mb-1 flex flex-col gap-0.5 border-s ps-2">
          {node.children.map((child) => (
            <CategoryTreeItem
              key={child.slug}
              node={child}
              value={value}
              expanded={expanded}
              onToggle={onToggle}
              onChange={onChange}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
