import { create } from 'zustand';

type AuthModalState = {
  isOpen: boolean;
  /** Internal path to land on once the visitor signs in — passed to `PhoneAuthFlow`. */
  redirectTo?: string;
  open: (redirectTo?: string) => void;
  close: () => void;
};

/**
 * Global "you need to sign in" modal — opened from anywhere a request needs auth
 * (a query/mutation throwing `UnauthorizedError`, the checkout button, …) instead of a
 * full-page redirect to `/login`. Not persisted — always starts closed on load.
 */
export const useAuthModalStore = create<AuthModalState>()((set) => ({
  isOpen: false,
  redirectTo: undefined,
  open: (redirectTo) => set({ isOpen: true, redirectTo }),
  close: () => set({ isOpen: false }),
}));
