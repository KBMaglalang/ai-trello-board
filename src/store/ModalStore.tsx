import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  isEditModal: boolean;
  cardInfo: any | null;

  openModal: (editState?: boolean, todo?: any, id?: string | null) => void;
  closeModal: () => void;
  clearCardInfo: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  isEditModal: false,
  cardInfo: null,

  openModal: (editState = false, todo = null, id = null) =>
    set({ isOpen: true, isEditModal: editState, cardInfo: { todo, id } }),
  closeModal: () => set({ isOpen: false, isEditModal: false }),
  clearCardInfo: () => set({ cardInfo: null }),
}));
