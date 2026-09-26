import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ThemeMode } from '@/constants';

type UiState = {
  theme: ThemeMode;
  sidebarOpen: boolean;
  /** Mini-cart drawer — opened by the header cart button and after an add-to-cart. */
  miniCartOpen: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setMiniCartOpen: (open: boolean) => void;
};

/** Global, cross-feature UI state. Feature state lives in its own feature slice. */
export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: ThemeMode.System,
      sidebarOpen: true,
      miniCartOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setMiniCartOpen: (miniCartOpen) => set({ miniCartOpen }),
    }),
    {
      name: 'abzar-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ theme: s.theme, sidebarOpen: s.sidebarOpen }),
    },
  ),
);
