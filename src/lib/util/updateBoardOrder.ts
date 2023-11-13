import { updateBoard } from "../appwrite/boards";

export const updateBoardOrder = async (boardId: string, order: string[]) => {
  const data = await updateBoard(boardId, { order: order });

  return data;
};
