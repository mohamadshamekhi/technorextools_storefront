import { create } from 'zustand';

export type Toast = { id: number; message: string };

type ToastState = {
  toasts: Toast[];
  push: (message: string) => void;
  dismiss: (id: number) => void;
};

let nextId = 1;

/** Ephemeral toasts — not persisted. Rendered by `<Toaster />`. */
export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (message) => set((s) => ({ toasts: [...s.toasts, { id: nextId++, message }].slice(-3) })),
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
