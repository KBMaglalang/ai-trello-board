import { databases } from '@/config/appwrite';

/**

Retrieves the list of boards.
@returns {Promise} - A promise that resolves with the list of boards. */
export const getBoards = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!
  );

  const boards = data.documents;

  return boards;
};
