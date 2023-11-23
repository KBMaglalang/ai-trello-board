// delete board in database

import { databases } from "@/config/appwrite";

/**

Deletes a board with the specified ID.
@param {string} boardId - The ID of the board to delete.
@returns {Promise} - A promise that resolves after the board is deleted. */
export const deleteBoard = async (boardId: string) => {
  const data = await databases.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!,
    boardId
  );
};
