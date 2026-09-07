import type { CartLine } from '@/store/cart-store';

import { CartItemRow } from './cart-item-row';

type CartItemListProps = {
  lines: CartLine[];
  resolveCategory: (line: CartLine) => string | undefined;
  onChangeQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export function CartItemList({
  lines,
  resolveCategory,
  onChangeQuantity,
  onRemove,
}: CartItemListProps) {
  return (
    <div className="flex flex-col gap-3.5">
      {lines.map((line) => (
        <CartItemRow
          key={line.id}
          line={line}
          categorySlug={resolveCategory(line)}
          onChangeQuantity={(quantity) => onChangeQuantity(line.id, quantity)}
          onRemove={() => onRemove(line.id)}
        />
      ))}
    </div>
  );
}
