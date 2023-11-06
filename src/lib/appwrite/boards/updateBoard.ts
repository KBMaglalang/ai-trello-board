// update board in database

import { databases } from "@/config/appwrite";

export const updateBoard = async (boardId: string, title: string) => {
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!,
    boardId,
    {
      title,
    }
  );

  return data;
};
