import { create } from "zustand";

// constants and functions
import {
  getBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} from "@/lib/appwrite/boards";

interface BoardState {
  boardList: any[];
  workingBoard: any;
  workingColumn: any;
  workingCard: any;

  cardTitle: string;
  cardDescription: string;
  cardStartDate: string;
  cardEndDate: string;
  cardPriority: string;
  cardCompleted: boolean;
  cardImage: any;

  setBoardList: (boardList: any[]) => void;
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

  setCardStartDate: (startDate: string) => void;
  setCardEndDate: (endDate: string) => void;
  clearCardDate: () => void;

  setTaskPriority: (taskPriority: string) => void;
  clearTaskPriority: () => void;

  setCardTitle: (cardTitle: string) => void;
  clearCardTitle: () => void;

  setCardDescription: (cardDescription: string) => void;
  clearCardDescription: () => void;

  setCardCompleted: (cardCompleted: boolean) => void;
  clearCardCompleted: () => void;

  setCardImage: (cardImage: any) => void;
  clearCardImage: () => void;

  clearCardState: () => void;
}

export const useBoardStateStore = create<BoardState>((set, get) => ({
  // state
  boardList: [],
  workingBoard: null,
  workingColumn: null,
  workingCard: null,

  cardTitle: "",
  cardDescription: "",
  cardStartDate: "",
  cardEndDate: "",
  cardPriority: "",
  cardCompleted: false,
  cardImage: null,

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

  // --- date ---
  setCardStartDate: (cardStartDate) => set({ cardStartDate }),
  setCardEndDate: (cardEndDate) => set({ cardEndDate }),
  clearCardDate: () => set({ cardStartDate: "", cardEndDate: "" }),

  // --- task priority ---
  setTaskPriority: (taskPriority) => set({ cardPriority: taskPriority }),
  clearTaskPriority: () => set({ cardPriority: "" }),

  // --- cardTitle ---
  setCardTitle: (cardTitle) => set({ cardTitle }),
  clearCardTitle: () => set({ cardTitle: "" }),

  // --- cardDescription ---
  setCardDescription: (cardDescription) => set({ cardDescription }),
  clearCardDescription: () => set({ cardDescription: "" }),

  // --- cardCompleted ---
  setCardCompleted: (cardCompleted) => set({ cardCompleted }),
  clearCardCompleted: () => set({ cardCompleted: false }),

  // --- cardImage ---
  setCardImage: (cardImage) => set({ cardImage }),
  clearCardImage: () => set({ cardImage: null }),

  // --- clear card state ---
  clearCardState: () =>
    set({
      cardTitle: "",
      cardDescription: "",
      cardStartDate: "",
      cardEndDate: "",
      cardPriority: "",
      cardCompleted: false,
      cardImage: null,
    }),
}));
