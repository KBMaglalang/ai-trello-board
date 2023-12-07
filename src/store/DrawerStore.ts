import { create } from 'zustand';

interface DrawerState {
  isOpen: boolean;

  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set, get) => ({
  isOpen: false,

  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
}));
