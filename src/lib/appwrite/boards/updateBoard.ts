// update board in database

import { databases } from '@/config/appwrite';

/**

Updates a board with the provided board data.
@param {string} boardId - The ID of the board to update.
@param {any} boardData - The updated data for the board.
@returns {Promise} - A promise that resolves with the updated board data. */
export const updateBoard = async (boardId: string, boardData: any) => {
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!,
    boardId,
    {
      ...boardData,
    }
  );

  return data;
};
