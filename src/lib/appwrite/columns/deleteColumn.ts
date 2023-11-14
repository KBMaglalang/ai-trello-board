// delete board in database

import { databases } from "@/config/appwrite";

export const deleteColumn = async (columnId: string) => {
  await databases.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID!,
    columnId
  );
};
