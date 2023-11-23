import { updateBoard } from "../appwrite/boards";

/**

Updates the title of a board with the provided title.
@param {string} boardId - The ID of the board to update.
@param {string} title - The updated title of the board.
@returns {Promise} - A promise that resolves */
export const updateBoardTitle = async (boardId: string, title: string) => {
  const data = await updateBoard(boardId, { title: title });

  return data;
};
