import { databases } from "@/config/appwrite";

export const addCardToColumn = async (columnId: string, cardArray: any[]) => {
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID!,
    columnId,
    {
      todos: cardArray,
    }
  );

  return data;
};
