import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ThemeMode } from '@/constants';

type UiState = {
  theme: ThemeMode;
  sidebarOpen: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
};

/** Global, cross-feature UI state. Feature state lives in its own feature slice. */
export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: ThemeMode.System,
      sidebarOpen: true,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    {
      name: 'abzar-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ theme: s.theme, sidebarOpen: s.sidebarOpen }),
    },
  ),
);
