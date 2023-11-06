// delete board in database

import { databases } from "@/config/appwrite";

export const deleteBoard = async (boardId: string) => {
  const data = await databases.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!,
    boardId
  );
};
