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

  setBoardState: (board: Board) => void;
  // countTodos: (columnId: TypedColumn) => number;
  setSearchString: (searchString: string) => void;

  setNewTaskType: (columnId: TypedColumn) => void;
  setNewTaskInput: (input: string) => void;
  setNewTaskDescription: (description: string) => void;
  setNewTaskPriority: (priority: PriorityStatus) => void;
  setNewTaskStartDate: (startDate: string) => void;
  setNewTaskEndDate: (endDate: string) => void;
  setImage: (image: File | null) => void;

  addTask: (
    todo: string,
    description: string,
    priority: PriorityStatus,
    columnId: TypedColumn,
    image?: File | null,
    startDate?: string,
    endDate?: string
  ) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
  clearNewTaskStates: () => void;
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  // --- initial state ---
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

  // --- setters ---
  setSearchString: (searchString: string) => set({ searchString }),
  // countTodos: (columnId: TypedColumn) =>
  //   get().board.columns.get(columnId)?.todos.length || 0,
  setBoardState: async (board: Board) => {
    set({ board });
  },

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

  // --- task functions ---
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
    set({
      newTaskInput: "",
      newTaskDescription: "",
      newTaskPriority: null,
      newTaskStartDate: "",
      newTaskEndDate: "",
    });

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

  updateTodoInDB: async (todo: Todo, columnId: TypedColumn) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
        description: todo.description,
        priority: todo.priority,
        image: todo.image,
        startDate: todo.startDate,
        endDate: todo.endDate,
      }
    );
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

  clearNewTaskStates: () =>
    set({
      newTaskInput: "",
      newTaskDescription: "",
      newTaskPriority: null,
      newTaskStartDate: "",
      newTaskEndDate: "",
    }),
}));
