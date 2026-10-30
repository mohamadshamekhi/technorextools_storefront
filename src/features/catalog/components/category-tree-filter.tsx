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
    <fieldset className="flex flex-col gap-1">
      <legend className="sr-only">دسته‌بندی</legend>
      <button
        type="button"
        onClick={() => onChange(undefined)}
        aria-pressed={allActive}
        className={cn(
          'flex min-h-10 items-center justify-between gap-2 rounded-lg px-2.5 text-[13px] transition-colors',
          allActive
            ? 'text-brand-600 bg-brand-50 font-bold'
            : 'text-foreground-muted hover:bg-surface-muted hover:text-foreground',
        )}
      >
        <span>همه</span>
        {allActive ? <Icon name="check" className="size-3.5 shrink-0" /> : null}
      </button>
      <ul className="flex flex-col gap-1">
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
