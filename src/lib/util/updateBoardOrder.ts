import { updateBoard } from '../appwrite/boards';

/**

Updates the order of a board with the provided order array.
@param {string} boardId - The ID of the board to update.
@param {Array} order - The array containing the updated order data.
@returns {Promise} - A promise that resolves with the updated board data. */
export const updateBoardOrder = async (boardId: string, order: string[]) => {
  const data = await updateBoard(boardId, { order: order });

  return data;
};
