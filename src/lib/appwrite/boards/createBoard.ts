// create board on the appwrite datbase

import { ID, databases } from '@/config/appwrite';

/**

Creates a new board.
@returns {Promise} - A promise that resolves with the created board data. */
export const createBoard = async () => {
  const data = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!,
    ID.unique(),
    {
      title: 'New Board',
    }
  );

  return data;
};
