import { create } from "zustand";

// appwrite functions
import {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} from "@/lib/appwrite/boards";

interface NewBoardState {
  boardList: any;
  workingBoard: any;

  setBoardList: (boardList: any) => void;
  getBoardList: () => void;
  clearBoardList: () => void;

  createNewBoard: () => void;
  updateNewBoard: (id: string, title: string) => void;
  deleteNewBoard: (id: string) => void;

  setWorkingBoard: (workingBoard: any) => void;
  clearWorkingBoard: () => void;
}

export const useNewBoardStore = create<NewBoardState>((set, get) => ({
  // state
  boardList: [],
  workingBoard: null,

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
}));
