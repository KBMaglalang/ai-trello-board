import { updateBoard } from "../appwrite/boards";

export const updateBoardColumns = async (boardId: string, columnArray: any) => {
  const data = await updateBoard(boardId, { columns: columnArray });

  return data;
};
