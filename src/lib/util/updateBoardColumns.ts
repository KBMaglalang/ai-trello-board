import { updateBoard } from '../appwrite/boards';

/**

Updates the columns of a board with the provided column array.
@param {string} boardId - The ID of the board to update.
@param {Array} columnArray - The array containing the updated column data.
@returns {Promise} - A promise that resolves with the updated board data. */

export const updateBoardColumns = async (boardId: string, columnArray: any) => {
  const data = await updateBoard(boardId, { columns: columnArray });

  return data;
};
