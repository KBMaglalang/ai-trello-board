import { create } from 'zustand';

interface DrawerState {
  responseDrawerOpen: boolean;
  toggleResponseDrawer: () => void;
  openResponseDrawer: () => void;
  closeResponseDrawer: () => void;

  responseSummary: string;
  setResponseSummary: (summary: string) => void;
  clearResponseSummary: () => void;

  responseBreakdown: string[];
  setResponseBreakdown: (breakdown: string[]) => void;
  clearResponseBreakdown: () => void;

  responseLoading: boolean;
  setResponseLoading: (loading: boolean) => void;
  clearResponseLoading: () => void;
}

export const useResponseDrawerStore = create<DrawerState>((set, get) => ({
  // --- Response Drawer ---
  responseDrawerOpen: false,
  toggleResponseDrawer: () => set((state) => ({ responseDrawerOpen: !state.responseDrawerOpen })),
  openResponseDrawer: () => set({ responseDrawerOpen: true }),
  closeResponseDrawer: () => set({ responseDrawerOpen: false }),

  // --- Response Summary ---
  responseSummary: '',
  setResponseSummary: (summary: string) => set({ responseSummary: summary }),
  clearResponseSummary: () => set({ responseSummary: '' }),

  // --- Response Breakdown ---
  responseBreakdown: [],
  setResponseBreakdown: (breakdown: string[]) => set({ responseBreakdown: breakdown }),
  clearResponseBreakdown: () => set({ responseBreakdown: [] }),

  // --- Response Loading ---
  responseLoading: false,
  setResponseLoading: (loading: boolean) => set({ responseLoading: loading }),
  clearResponseLoading: () => set({ responseLoading: false }),
}));
