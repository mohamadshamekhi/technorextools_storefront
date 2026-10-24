import Image from 'next/image';

import { Icon } from '@/components/atoms';
import { categoryPresentation, type CategoryNode } from '@/features/catalog';

/** 36px category thumbnail — API image when present, else the slug's preset icon + tint. */
export function CategoryChip({ node }: { node: CategoryNode }) {
  if (node.imageUrl) {
    return (
      <span className="bg-surface-muted relative size-9 shrink-0 overflow-hidden rounded-lg">
        <Image src={node.imageUrl} alt="" fill sizes="36px" className="object-contain p-1" />
      </span>
    );
  }
  const style = categoryPresentation(node.slug);
  return (
    <span
      className="grid size-9 shrink-0 place-items-center rounded-lg"
      style={{ backgroundColor: style.tint, color: style.ink }}
    >
      <Icon name={style.icon} className="size-4" />
    </span>
  );
}
