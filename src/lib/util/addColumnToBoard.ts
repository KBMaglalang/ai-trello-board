import { updateBoard } from "../appwrite/boards";

export const addColumnToBoard = async (boardId: string, columnArray: any[]) => {
  const data = await updateBoard(boardId, { columns: columnArray });

  return data;
};
