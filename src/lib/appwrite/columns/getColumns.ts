import { databases } from "@/config/appwrite";

export const getColumns = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLUMNS_COLLECTION_ID!
  );

  const columns = data.documents;

  return columns;
};
