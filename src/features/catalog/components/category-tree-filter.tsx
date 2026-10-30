'use client';

import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { cn } from '@/lib/utils';

import { categoryAncestors, type CategoryOption } from '../utils/category-tree';
import { CategoryTreeItem } from './category-tree-item';

type CategoryTreeFilterProps = {
  tree: CategoryOption[];
  value: string | undefined;
  onChange: (slug: string | undefined) => void;
};

/** Category facet as a collapsible tree. Ancestors of the selected category start expanded. */
export function CategoryTreeFilter({ tree, value, onChange }: CategoryTreeFilterProps) {
  const [expanded, setExpanded] = useState(
    () => new Set(value ? categoryAncestors(tree, value) : []),
  );

  const toggle = (slug: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (!next.delete(slug)) next.add(slug);
      return next;
    });

  const allActive = value === undefined;

  return (
    <fieldset className="flex flex-col gap-0.5">
      <legend className="sr-only">دسته‌بندی</legend>
      <button
        type="button"
        onClick={() => onChange(undefined)}
        aria-pressed={allActive}
        className={cn(
          'relative flex min-h-10 cursor-pointer items-center gap-2.5 rounded-xl ps-2.5 text-[13px] transition-colors',
          allActive
            ? 'bg-brand-50 text-brand-700 font-bold'
            : 'text-foreground hover:bg-surface-muted font-semibold',
        )}
      >
        {allActive ? (
          <span className="bg-brand-500 absolute inset-y-2 start-0 w-1 rounded-full" />
        ) : null}
        <span className="bg-ink grid size-7 shrink-0 place-items-center rounded-lg text-white">
          <Icon name="grid" className="size-3.5" />
        </span>
        همه‌ی دسته‌ها
      </button>
      <ul className="flex flex-col gap-0.5">
        {tree.map((node) => (
          <CategoryTreeItem
            key={node.slug}
            node={node}
            value={value}
            expanded={expanded}
            onToggle={toggle}
            onChange={onChange}
          />
        ))}
      </ul>
    </fieldset>
  );
}
