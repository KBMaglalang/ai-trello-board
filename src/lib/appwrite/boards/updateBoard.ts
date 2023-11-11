// update board in database

import { databases } from "@/config/appwrite";

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
