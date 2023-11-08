import { databases, ID } from "@/config/appwrite";

export const addColumnToBoard = async (boardId: string, columnArray: any[]) => {
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOARDS_COLLECTION_ID!,
    boardId,
    {
      columns: columnArray,
    }
  );

  return data;
};
