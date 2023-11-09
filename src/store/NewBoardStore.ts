import { create } from "zustand";

// constants and functions
import {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} from "@/lib/appwrite/boards";
import {
  createColumn,
  getColumns,
  deleteColumn,
  updateColumn,
  addColumnToBoard,
} from "@/lib/appwrite/columns";
import {
  createCard,
  getCards,
  updateCard,
  deleteCard,
  addCardToColumn,
} from "@/lib/appwrite/cards";

interface NewBoardState {
  boardList: any;
  workingBoard: any;
  workingColumn: any;
  workingCard: any;

  setBoardList: (boardList: any) => void;
  getBoardList: () => void;
  clearBoardList: () => void;

  createNewBoard: () => void;
  updateNewBoard: (id: string, title: string) => void;
  deleteNewBoard: (id: string) => void;

  setWorkingBoard: (workingBoard: any) => void;
  clearWorkingBoard: () => void;

  setWorkingColumn: (workingColumn: any) => void;
  clearWorkingColumn: () => void;

  setWorkingCard: (workingCard: any) => void;
  clearWorkingCard: () => void;
}

export const useNewBoardStore = create<NewBoardState>((set, get) => ({
  // state
  boardList: [],
  workingBoard: null,
  workingColumn: null,
  workingCard: null,

  // setters and getters

  // --- board list ---
  setBoardList: (boardList) => set({ boardList }),
  getBoardList: async () => {
    const boardList = await getBoards();
    set({ boardList });
  },
  clearBoardList: () => set({ boardList: [] }),

  // --- board ---
  createNewBoard: async () => {
    await createBoard();

    // update the board list after creating
    const boardList = await getBoards();
    set({ boardList });
  },
  updateNewBoard: async (id: string, title: string) => {
    updateBoard(id, title);

    // update the board list after updating
    const boardList = await getBoards();
    set({ boardList });
  },
  deleteNewBoard: async (id: string) => {
    await deleteBoard(id);

    //  update the board list after deleting
    const boardList = await getBoards();
    set({ boardList });
  },

  // --- working board ---
  setWorkingBoard: (workingBoard) => set({ workingBoard }),
  clearWorkingBoard: () => set({ workingBoard: null }),

  // --- working column ---
  setWorkingColumn: (workingColumn) => set({ workingColumn }),
  clearWorkingColumn: () => set({ workingColumn: null }),

  // --- working card ---
  setWorkingCard: (workingCard) => set({ workingCard }),
  clearWorkingCard: () => set({ workingCard: null }),
}));
