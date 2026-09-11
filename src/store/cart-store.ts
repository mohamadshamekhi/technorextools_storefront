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
  /** Product's main image, when the catalogue provided one. */
  imageUrl?: string | null;
};

type CartState = {
  lines: CartLine[];
  /** Selected shipping method, carried from `/cart` into `/checkout`. */
  shippingMethodId: string | null;
  /** Cached cost of `shippingMethodId` at selection time, so `/checkout` doesn't need to
   * refetch shipping methods just to know what was picked. */
  shippingCost: number;
  /** Applied discount code + the absolute تومان amount `abzar/api` validated it for. */
  discountCode: string | null;
  discountAmount: number;
  /** Add `quantity` units (default 1), merging into an existing line. */
  addItem: (item: Omit<CartLine, 'quantity'>, quantity?: number) => void;
  /** Set an absolute quantity; drops the line at zero. */
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  setShippingMethod: (id: string, cost: number) => void;
  setDiscount: (code: string, amount: number) => void;
  clearDiscount: () => void;
  clear: () => void;
};

/**
 * Client-side cart. Persistence is per-browser only — the authoritative
 * cart lives in `abzar/api` and is reconciled at checkout.
 *
 * The chosen shipping method and applied discount live here too (not as local component
 * state) so they survive navigating `/cart` → `/checkout` and back, instead of resetting.
 * A discount is cleared whenever the line items change — it was validated against a
 * specific subtotal, so it must be re-applied once that subtotal moves.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      shippingMethodId: null,
      shippingCost: 0,
      discountCode: null,
      discountAmount: 0,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.id === item.id);
          const lines = existing
            ? state.lines.map((line) =>
                line.id === item.id ? { ...line, quantity: line.quantity + quantity } : line,
              )
            : [...state.lines, { ...item, quantity }];
          return { lines, discountCode: null, discountAmount: 0 };
        }),
      setQuantity: (id, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((line) => line.id !== id)
              : state.lines.map((line) => (line.id === id ? { ...line, quantity } : line)),
          discountCode: null,
          discountAmount: 0,
        })),
      removeItem: (id) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.id !== id),
          discountCode: null,
          discountAmount: 0,
        })),
      setShippingMethod: (id, cost) => set({ shippingMethodId: id, shippingCost: cost }),
      setDiscount: (code, amount) => set({ discountCode: code, discountAmount: amount }),
      clearDiscount: () => set({ discountCode: null, discountAmount: 0 }),
      clear: () =>
        set({
          lines: [],
          shippingMethodId: null,
          shippingCost: 0,
          discountCode: null,
          discountAmount: 0,
        }),
    }),
    {
      name: 'technorextools-cart',
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
