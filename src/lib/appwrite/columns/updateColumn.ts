import { databases } from "@/config/appwrite";

/**

Updates a column in the database with the given ID.
@param {string} columnId - The ID of the column to update.
@param {any} columnData - The data to update the column with.
@returns {Promise<Object>} A promise that resolves to the updated column object. */
export const updateColumn = async (columnId: string, columnData: any) => {
  const data = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID!,
    columnId,
    {
      ...columnData,
    }
  );

  return data;
};
