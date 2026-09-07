import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartLine = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  /** e.g. "آبی · ۱/۲ اینچ استاندارد" — set when added from a product's buy box. */
  variant?: string;
  /** Pre-discount unit price, when the product was on sale. */
  compareAt?: number | null;
  /** Catalogue category slug — drives the coloured icon badge in the cart. */
  categorySlug?: string;
};

type CartState = {
  lines: CartLine[];
  /** Add `quantity` units (default 1), merging into an existing line. */
  addItem: (item: Omit<CartLine, 'quantity'>, quantity?: number) => void;
  /** Set an absolute quantity; drops the line at zero. */
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

/**
 * Client-side cart. Persistence is per-browser only — the authoritative
 * cart lives in `abzar/api` and is reconciled at checkout.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.id === item.id);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.id === item.id ? { ...line, quantity: line.quantity + quantity } : line,
              ),
            };
          }
          return { lines: [...state.lines, { ...item, quantity }] };
        }),
      setQuantity: (id, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((line) => line.id !== id)
              : state.lines.map((line) => (line.id === id ? { ...line, quantity } : line)),
        })),
      removeItem: (id) => set((state) => ({ lines: state.lines.filter((line) => line.id !== id) })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: 'pumaair-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

/** Total unit count — selector kept next to the store it reads. */
export const selectCartQuantity = (state: CartState) =>
  state.lines.reduce((sum, line) => sum + line.quantity, 0);

/** Order subtotal in toman — selector kept next to the store it reads. */
export const selectCartSubtotal = (state: CartState) =>
  state.lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
