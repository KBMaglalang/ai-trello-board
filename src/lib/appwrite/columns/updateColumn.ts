import { databases } from "@/config/appwrite";

export const updateColumn = async (columnId: string, columnData: any) => {
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID!,
    columnId,
    {
      ...columnData,
    }
  );
  console.log("🚀 ~ file: updateColumn.ts:12 ~ updateColumn ~ data:", data);

  return data;
};
