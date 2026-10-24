'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Icon } from '@/components/atoms';
import { routes } from '@/config/routes';
import { topLevelCategories, type CategoryNode } from '@/features/catalog';
import { cn } from '@/lib/utils';

import { CategoryChip } from './category-chip';

type CategoryAccordionProps = {
  nodes: CategoryNode[];
  onNavigate: () => void;
  depth?: number;
};

/** Mobile category tree: parents expand in place (one open per level), leaves navigate. */
export function CategoryAccordion({ nodes, onNavigate, depth = 0 }: CategoryAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const items = topLevelCategories(nodes);

  return (
    <ul className={cn('flex flex-col gap-1', depth > 0 && 'border-hairline ms-5 border-s ps-2')}>
      {items.map((node) => {
        const hasChildren = node.children.length > 0;
        const open = openId === node.id;
        const rowClass = cn(
          'flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-start transition-colors',
          depth === 0 ? 'text-[15px] font-semibold' : 'text-sm font-medium',
          open ? 'bg-brand-50 text-brand-700' : 'active:bg-surface-muted',
        );
        const label = (
          <>
            {depth === 0 ? <CategoryChip node={node} /> : null}
            <span className="flex-1 truncate">{node.title}</span>
          </>
        );

        return (
          <li key={node.id}>
            {hasChildren ? (
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : node.id)}
                className={rowClass}
              >
                {label}
                <Icon
                  name="chevronDown"
                  className={cn(
                    'text-foreground-muted size-4 shrink-0 transition-transform',
                    open && 'text-brand-700 rotate-180',
                  )}
                />
              </button>
            ) : (
              <Link href={routes.category(node.slug)} onClick={onNavigate} className={rowClass}>
                {label}
              </Link>
            )}
            {hasChildren && open ? (
              <div className="mt-1 flex flex-col gap-1">
                <Link
                  href={routes.category(node.slug)}
                  onClick={onNavigate}
                  className="text-brand-700 ms-5 flex min-h-11 items-center gap-1 rounded-xl px-4 text-sm font-bold"
                >
                  همه‌ی {node.title}
                  <Icon name="chevron" className="size-4" />
                </Link>
                <CategoryAccordion
                  nodes={node.children}
                  onNavigate={onNavigate}
                  depth={depth + 1}
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
