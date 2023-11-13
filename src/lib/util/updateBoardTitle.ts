import { updateBoard } from "../appwrite/boards";

export const updateBoardTitle = async (boardId: string, title: string) => {
  const data = await updateBoard(boardId, { title: title });

  return data;
};
