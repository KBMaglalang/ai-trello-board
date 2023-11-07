import { databases } from "@/config/appwrite";

export const updateColumn = async (columnId: string, title: string) => {
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID!,
    columnId,
    {
      title,
    }
  );

  return data;
};
