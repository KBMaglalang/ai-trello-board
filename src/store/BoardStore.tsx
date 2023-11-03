import { create } from "zustand";

import { ID, databases, storage } from "../config/appwrite";
import uploadImage from "@/lib/uploadImage";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";

interface BoardState {
  board: Board;
  getBoard: () => void;
  newTaskType: TypedColumn;
  newTaskInput: string;
  newTaskDescription: string;
  newTaskPriority: PriorityStatus;
  newTaskStartDate: string;
  newTaskEndDate: string;
  image: File | null;
  searchString: string;

  countTodos: (columnId: TypedColumn) => number;
  setBoardState: (board: Board) => void;
  addTask: (
    todo: string,
    description: string,
    priority: PriorityStatus,
    columnId: TypedColumn,
    image?: File | null,
    startDate?: string,
    endDate?: string
  ) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;

  setNewTaskType: (columnId: TypedColumn) => void;
  setNewTaskInput: (input: string) => void;
  setNewTaskDescription: (description: string) => void;
  setNewTaskPriority: (priority: PriorityStatus) => void;
  setNewTaskStartDate: (startDate: string) => void;
  setNewTaskEndDate: (endDate: string) => void;
  setImage: (image: File | null) => void;
  setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  newTaskType: "todo",
  newTaskInput: "",
  newTaskDescription: "",
  newTaskPriority: null,
  newTaskStartDate: "",
  newTaskEndDate: "",
  image: null,
  searchString: "",

  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  setNewTaskDescription: (description: string) =>
    set({ newTaskDescription: description }),
  setNewTaskPriority: (priority: PriorityStatus) =>
    set({ newTaskPriority: priority }),
  setNewTaskStartDate: (startDate: string) =>
    set({ newTaskStartDate: startDate }),
  setNewTaskEndDate: (endDate: string) => set({ newTaskEndDate: endDate }),
  setImage: (image: File | null) => set({ image }),

  setSearchString: (searchString: string) => set({ searchString }),

  updateTodoInDB: async (todo: Todo, columnId: TypedColumn) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        // description: todo.description,
        // priority: todo.priority,
        status: columnId,
      }
    );
  },

  countTodos: (columnId: TypedColumn) =>
    get().board.columns.get(columnId)?.todos.length || 0,

  setBoardState: async (board: Board) => {
    set({ board });
  },

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);

    // delete todoId from newColumns
    newColumns.get(id)?.todos.splice(taskIndex, 1);

    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  addTask: async (
    todo: string,
    description: string,
    priority: PriorityStatus,
    columnId: TypedColumn,
    image?: File | null,
    startDate?: string,
    endDate?: string
  ) => {
    let file: Image | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        description: description,
        priority: priority,
        status: columnId,
        startDate: startDate,
        endDate: endDate,
        // include image if it exists
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    // reset fields
    set({ newTaskInput: "" });
    set({ newTaskDescription: "" });
    set({ newTaskPriority: null });
    set({ newTaskStartDate: "" });
    set({ newTaskEndDate: "" });

    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        description: description,
        priority: priority,
        status: columnId,
        startDate: startDate,
        endDate: endDate,
        // include image if it exists
        ...(file && { image: file }),
      };

      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
}));
